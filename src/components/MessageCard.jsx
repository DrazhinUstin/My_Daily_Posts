import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import {
    doc,
    query,
    collection,
    orderBy,
    limit,
    deleteDoc,
    getDocs,
    writeBatch,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { ImageGallery } from '.';
import { MessageCard as Card, Avatar, Button, AlertButton } from '../styled';

const MessageCard = ({
    chatID,
    chatUID,
    id,
    senderID: uid,
    displayName,
    photoURL,
    message,
    imageURL,
    timestamp,
    isLastMessage,
    editableMessage,
    setEditableMessage,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteMessage = async () => {
        setIsLoading(true);
        try {
            await deleteDoc(doc(db, `chats/${chatID}/messages/${id}`));
            if (isEditable) setEditableMessage(null);
            if (imageURL) await deleteObject(ref(storage, `chats/${chatID}/${id}`));
            if (isLastMessage) {
                const { docs } = await getDocs(
                    query(
                        collection(db, `chats/${chatID}/messages`),
                        orderBy('timestamp', 'desc'),
                        limit(1)
                    )
                );
                const { senderID = null, message = '' } = docs[0]?.data() || {};
                const batch = writeBatch(db);
                batch.update(doc(db, `users/${auth.currentUser.uid}`), {
                    [`chats.${chatUID}.senderID`]: senderID,
                    [`chats.${chatUID}.message`]: message,
                });
                batch.update(doc(db, `users/${chatUID}`), {
                    [`chats.${auth.currentUser.uid}.senderID`]: senderID,
                    [`chats.${auth.currentUser.uid}.message`]: message,
                });
                await batch.commit();
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const isCurrentUser = uid === auth.currentUser.uid;
    const isEditable = id === editableMessage?.id;
    return (
        <Card isCurrentUser={isCurrentUser} isEditable={isEditable}>
            <Link to={isCurrentUser ? '/' : `/user/${uid}`}>
                <Avatar src={photoURL} size='2rem' />
            </Link>
            <div>
                <h4>{displayName}</h4>
                <p>{message}</p>
                {imageURL && <ImageGallery urls={[imageURL]} className='media' />}
                <p className='date'>{formatTimestamp(timestamp)}</p>
            </div>
            {isCurrentUser && (
                <div className='controls'>
                    <Button
                        $icon
                        onClick={() =>
                            setEditableMessage(
                                !isEditable ? { id, message, imageURL, isLastMessage } : null
                            )
                        }
                        disabled={isLoading}
                    >
                        <FaEdit />
                    </Button>
                    <AlertButton $icon onClick={deleteMessage} disabled={isLoading}>
                        <FaTrashAlt />
                    </AlertButton>
                </div>
            )}
        </Card>
    );
};

export default MessageCard;
