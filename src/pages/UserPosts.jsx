import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { query, collection, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Posts } from '../components';
import { Button } from '../styled';

const UserPosts = ({ initialLimit = 10 }) => {
    const { userData } = useOutletContext();
    const [posts, setPosts] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'posts'),
                where('uid', '==', userData?.uid),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => setPosts(docs.map((doc) => ({ id: doc.id, ...doc.data() })))
        );
        return () => unsubscribe();
    }, [userData, currentLimit]);

    return (
        <section>
            <Posts posts={posts} />
            {posts.length === currentLimit && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                        load next
                    </Button>
                </div>
            )}
        </section>
    );
};

export default UserPosts;