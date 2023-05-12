import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { query, collection, where, startAfter, limit, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { UserSearchForm, UserCard } from '../components';
import { Button } from '../styled';
import styled from 'styled-components';

const Users = ({ dbLimit = 10 }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [lastVisible, setLastVisible] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        let q = query(
            collection(db, 'users'),
            where('uid', '!=', auth.currentUser.uid),
            limit(dbLimit)
        );
        if (search) q = query(q, where('displayName', '==', search));
        getDocs(q)
            .then(({ docs }) => {
                setUsers(docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setLastVisible(docs.length === dbLimit ? docs[docs.length - 1] : null);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    }, [dbLimit, search]);

    const loadNext = async () => {
        setIsLoading(true);
        try {
            let q = query(
                collection(db, 'users'),
                where('uid', '!=', auth.currentUser.uid),
                startAfter(lastVisible),
                limit(dbLimit)
            );
            if (search) q = query(q, where('displayName', '==', search));
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
            <UserSearchForm isLoading={isLoading} search={search} setSearch={setSearch} />
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
            {!users.length && !isLoading && <h3 className='text-center'>No users were found...</h3>}
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
