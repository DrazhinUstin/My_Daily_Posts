import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { query, collection, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { usePostContext } from '../contexts/PostContext';
import { CreatePost, PostEditor, PostCard } from '../components';
import { Button } from '../styled';

const UserPosts = ({ initialLimit = 10 }) => {
    const { uid } = useOutletContext();
    const { isEditorOpen } = usePostContext() || {};
    const [posts, setPosts] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'posts'),
                where('uid', '==', uid),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => setPosts(docs.map((doc) => ({ id: doc.id, ...doc.data() }))),
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
                {posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                ))}
            </div>
            {posts.length === currentLimit && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                        load next
                    </Button>
                </div>
            )}
        </section>
    );
};

export default UserPosts;
