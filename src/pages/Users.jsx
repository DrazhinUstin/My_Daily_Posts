import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { query, collection, where, startAfter, limit, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import UserCard from '../components/UserCard';
import { Title, Button } from '../styled';
import styled from 'styled-components';

const Users = ({ dbLimit = 10 }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const q = query(
            collection(db, 'users'),
            where('uid', '!=', auth.currentUser.uid),
            limit(dbLimit)
        );
        getDocs(q)
            .then(({ docs }) => {
                setUsers(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setLastVisible(docs.length === dbLimit ? docs[docs.length - 1] : null);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    }, [dbLimit]);

    const loadNext = async () => {
        setIsLoading(true);
        try {
            const q = query(
                collection(db, 'users'),
                where('uid', '!=', auth.currentUser.uid),
                startAfter(lastVisible),
                limit(dbLimit)
            );
            const { docs } = await getDocs(q);
            setUsers((users) => [...users, ...docs.map((doc) => ({ id: doc.id, ...doc.data() }))]);
            setLastVisible(docs.length === dbLimit ? docs[docs.length - 1] : null);
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <main className='main'>
            <Title margin='0 0 4rem'>list of users</Title>
            <GridAutoFill>
                {users.map((user) => (
                    <UserCard key={user.uid} {...user} />
                ))}
            </GridAutoFill>
            {lastVisible && (
                <div className='text-center'>
                    <Button margin='4rem 0 0' onClick={loadNext} disabled={isLoading}>
                        view more
                    </Button>
                </div>
            )}
        </main>
    );
};

export default Users;

const GridAutoFill = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-start;
    gap: 2rem;
`;
