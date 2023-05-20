import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { query, collection, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import UserCard from '../components/UserCard';
import Button from '../styled/Button';
import styled from 'styled-components';

const UserConnections = ({ initialLimit = 10 }) => {
    const { userData } = useOutletContext();
    const [connections, setConnections] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'users'),
                where('connections', 'array-contains', userData?.uid),
                limit(currentLimit)
            ),
            ({ docs }) => setConnections(docs.map((doc) => doc.data())),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [userData, currentLimit]);

    return (
        <section>
            <GridAutoFill>
                {connections.map((connection) => (
                    <UserCard key={connection.uid} {...connection} />
                ))}
            </GridAutoFill>
            {connections.length === currentLimit && (
                <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                    <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                        load more
                    </Button>
                </div>
            )}
        </section>
    );
};

export default UserConnections;

const GridAutoFill = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-start;
    gap: 2rem;
`;
