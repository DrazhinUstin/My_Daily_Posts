import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { query, collection, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CommentCard, CommentForm } from '.';
import { Button } from '../styled';

const PostCardComments = ({ postID, initialLimit = 10 }) => {
    const [comments, setComments] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);
    const [editableComment, setEditableComment] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, `posts/${postID}/comments`),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => setComments(docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [postID, currentLimit]);

    return (
        <div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {comments.map((comment, index) => (
                    <CommentCard
                        key={index}
                        postID={postID}
                        {...comment}
                        editableComment={editableComment}
                        setEditableComment={setEditableComment}
                    />
                ))}
                {comments.length === currentLimit && (
                    <div style={{ textAlign: 'center' }}>
                        <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                            load more
                        </Button>
                    </div>
                )}
            </div>
            <CommentForm
                postID={postID}
                editableComment={editableComment}
                setEditableComment={setEditableComment}
            />
        </div>
    );
};

export default PostCardComments;
