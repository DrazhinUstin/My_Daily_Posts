import { useState } from 'react';
import { FaPaperPlane, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, collection, runTransaction, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Input, Button } from '../styled';
import styled from 'styled-components';

const CommentForm = ({ postID }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const postRef = doc(db, 'posts', postID);
            const commentRef = doc(collection(postRef, 'comments'));
            await runTransaction(db, async (transaction) => {
                const postDoc = await transaction.get(postRef);
                const commentsAmount = (postDoc.data().commentsAmount || 0) + 1;
                transaction.update(postRef, { commentsAmount });
                transaction.set(commentRef, {
                    uid: auth.currentUser.uid,
                    displayName: auth.currentUser.displayName,
                    photoURL: auth.currentUser.photoURL,
                    message,
                    timestamp: serverTimestamp(),
                });
            });
            setMessage('');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isLoading}
                placeholder='Type a comment...'
                maxLength={100}
                required
            />
            <Button type='submit' disabled={isLoading}>
                <FaPaperPlane />
            </Button>
        </Form>
    );
};

export default CommentForm;

const Form = styled.form`
    display: flex;
    column-gap: 0.25rem;
    margin-top: 0.75rem;
    input {
        width: 100%;
    }
`;
