import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { query, collection, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { usePostContext } from '../contexts/PostContext';
import { Loader, CreatePost, PostEditor, PostCard } from '../components';
import { Button } from '../styled';

const UserPosts = ({ initialLimit = 10 }) => {
    const { uid, displayName, photoURL } = useOutletContext();
    const { isEditorOpen } = usePostContext() || {};
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);

    useEffect(() => {
        setIsLoading(true);
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'posts'),
                where('uid', '==', uid),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => {
                setPosts(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setIsLoading(false);
            },
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [uid, currentLimit]);

    return (
        <section>
            {uid === auth.currentUser.uid && (
                <>
                    <CreatePost />
                    {isEditorOpen && <PostEditor />}
                </>
            )}
            <div style={{ display: 'grid', rowGap: '2rem' }}>
                {posts.map((post) => (
                    <PostCard key={post.id} post={{ ...post, displayName, photoURL }} />
                ))}
                {posts.length === currentLimit && (
                    <div className='text-center'>
                        <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                            load next
                        </Button>
                    </div>
                )}
                {isLoading && <Loader />}
            </div>
            {!isLoading && posts.length === 0 && (
                <p className='text-center italic'>No posts yet...</p>
            )}
        </section>
    );
};

export default UserPosts;
