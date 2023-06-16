import { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaEdit, FaImage } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, collection, runTransaction, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { FlexForm, Input, Button, GreenButton } from '../styled';

const MessageForm = ({ chatID, uid, editableMessage, setEditableMessage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({ message: '', file: '' });
    const inputRef = useRef(null);

    useEffect(() => {
        if (editableMessage) {
            setValues({ message: editableMessage.message, file: '' });
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
            await runTransaction(db, async (transaction) => {
                const data = {
                    senderID: auth.currentUser.uid,
                    message: values.message,
                    timestamp: serverTimestamp(),
                };
                transaction.set(messageRef, { ...data, imageURL });
                transaction.update(doc(db, `users/${auth.currentUser.uid}`), {
                    [`chats.${uid}`]: data,
                });
                transaction.update(doc(db, `users/${uid}`), {
                    [`chats.${auth.currentUser.uid}`]: data,
                });
            });
            setValues({ message: '', file: '' });
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
            await runTransaction(db, async (transaction) => {
                transaction.update(messageRef, {
                    message: values.message,
                    imageURL,
                });
                if (editableMessage.isLastMessage) {
                    transaction.update(doc(db, `users/${auth.currentUser.uid}`), {
                        [`chats.${uid}.message`]: values.message,
                    });
                    transaction.update(doc(db, `users/${uid}`), {
                        [`chats.${auth.currentUser.uid}.message`]: values.message,
                    });
                }
            });
            setEditableMessage(null);
            setValues({ message: '', file: '' });
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
                setValues({ ...values, [name]: '' });
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
