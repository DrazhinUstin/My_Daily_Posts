import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, runTransaction } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { CommentCard as Card, Avatar, Button, AlertButton } from '../styled';

const CommentCard = ({
    postID,
    id,
    uid,
    photoURL,
    displayName,
    message,
    timestamp,
    editableComment,
    setEditableComment,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const deleteComment = async () => {
        setIsLoading(true);
        try {
            const postRef = doc(db, 'posts', postID);
            const commentRef = doc(postRef, 'comments', id);
            await runTransaction(db, async (transaction) => {
                const postDoc = await transaction.get(postRef);
                const commentsAmount = postDoc.data().commentsAmount - 1;
                transaction.update(postRef, { commentsAmount });
                transaction.delete(commentRef);
            });
            if (isEditable) setEditableComment(null);
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const fromCurrentUser = uid === auth.currentUser.uid;
    const isEditable = id === editableComment?.id;
    return (
        <Card fromCurrentUser={fromCurrentUser} isEditable={isEditable}>
            <Link to={fromCurrentUser ? '/' : `/user/${uid}`}>
                <Avatar src={photoURL} size='2rem' />
            </Link>
            <div className='container'>
                <header>
                    <Link to={fromCurrentUser ? '/' : `/user/${uid}`}>
                        <h4>{displayName}</h4>
                    </Link>
                    {fromCurrentUser && (
                        <div className='controls'>
                            <Button
                                $icon
                                onClick={() => setEditableComment({ id, message })}
                                disabled={isLoading}
                            >
                                <FaEdit />
                            </Button>
                            <AlertButton $icon onClick={deleteComment} disabled={isLoading}>
                                <FaTrashAlt />
                            </AlertButton>
                        </div>
                    )}
                </header>
                <p>{message}</p>
                <p className='date'>{formatTimestamp(timestamp)}</p>
            </div>
        </Card>
    );
};

export default CommentCard;
