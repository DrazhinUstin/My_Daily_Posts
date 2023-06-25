import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { query, collection, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Loader, CommentCard, CommentForm } from '.';
import { Button } from '../styled';

const PostCardComments = ({ postID, initialLimit = 10 }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);
    const [editableComment, setEditableComment] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(
            query(
                collection(db, `posts/${postID}/comments`),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => {
                setComments(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setIsLoading(false);
            },
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [postID, currentLimit]);

    return (
        <div>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                {comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
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
                {isLoading && <Loader size='4rem' />}
                {!isLoading && comments.length === 0 && (
                    <p className='text-center italic'>No comments yet...</p>
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
