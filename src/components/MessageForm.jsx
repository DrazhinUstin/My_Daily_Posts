import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaEdit, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, collection, writeBatch, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { FlexForm, Input, Button, GreenButton } from '../styled';

const MessageForm = ({ chatID, chatUID, editableMessage, setEditableMessage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({ message: '', file: null });
    const inputRef = useRef(null);

    useEffect(() => {
        if (editableMessage) {
            setValues({ message: editableMessage.message, file: null });
            inputRef.current.focus();
        }
    }, [editableMessage]);

    const addMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const messageRef = doc(collection(db, `chats/${chatID}/messages`));
            let imageURL = null;
            if (values.file) {
                const storageRef = ref(storage, `chats/${chatID}/${messageRef.id}`);
                await uploadBytes(storageRef, values.file);
                imageURL = await getDownloadURL(storageRef);
            }
            const batch = writeBatch(db);
            const data = {
                senderID: auth.currentUser.uid,
                message: values.message,
                timestamp: serverTimestamp(),
            };
            batch.set(messageRef, { ...data, imageURL });
            batch.update(doc(db, `users/${auth.currentUser.uid}`), {
                [`chats.${chatUID}`]: data,
            });
            batch.update(doc(db, `users/${chatUID}`), {
                [`chats.${auth.currentUser.uid}`]: data,
            });
            await batch.commit();
            setValues({ message: '', file: null });
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const editMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const messageRef = doc(db, `chats/${chatID}/messages/${editableMessage.id}`);
            let imageURL = editableMessage.imageURL || null;
            if (values.file) {
                const storageRef = ref(storage, `chats/${chatID}/${messageRef.id}`);
                await uploadBytes(storageRef, values.file);
                imageURL = await getDownloadURL(storageRef);
            }
            const batch = writeBatch(db);
            batch.update(messageRef, {
                message: values.message,
                imageURL,
            });
            if (editableMessage.isLastMessage) {
                batch.update(doc(db, `users/${auth.currentUser.uid}`), {
                    [`chats.${chatUID}.message`]: values.message,
                });
                batch.update(doc(db, `users/${chatUID}`), {
                    [`chats.${auth.currentUser.uid}.message`]: values.message,
                });
            }
            await batch.commit();
            setEditableMessage(null);
            setValues({ message: '', file: null });
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'file') {
            value = e.target.files[0];
            if (!value) {
                setValues({ ...values, [name]: null });
                return;
            }
            if (!value.type.startsWith('image/')) {
                toast.error(`Type ${value.type} is not a valid file type!`);
                return;
            }
            if (value.size > 3e6) {
                toast.error(`File is too big. The max valid file size is 3 MB.`);
                return;
            }
        }
        setValues({ ...values, [name]: value });
    };

    return (
        <FlexForm onSubmit={editableMessage ? editMessage : addMessage}>
            <Input
                name='message'
                value={values.message}
                onChange={handleChange}
                disabled={isLoading}
                maxLength={200}
                placeholder='Write a message...'
                ref={inputRef}
                required
            />
            <input type='file' name='file' onChange={handleChange} accept='image/*' hidden />
            <GreenButton
                onClick={(e) => e.currentTarget.previousElementSibling.click()}
                disabled={isLoading}
            >
                <FaImage />
                {values.file && (
                    <img
                        src={URL.createObjectURL(values.file)}
                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                        alt='preview'
                    />
                )}
            </GreenButton>
            <Button type='submit' disabled={isLoading}>
                {editableMessage ? <FaEdit /> : <FaPaperPlane />}
            </Button>
        </FlexForm>
    );
};

export default MessageForm;
