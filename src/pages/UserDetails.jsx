import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Title, Avatar } from '../styled';
import { breakpoints } from '../GlobalStyle';
import styled from 'styled-components';

const UserDetails = () => {
    const { uid } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, `users/${uid}`),
            (doc) => setUserData(doc.data()),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [uid]);

    useEffect(() => {
        if (userData) setIsLoading(false);
    }, [userData]);

    if (isLoading) return <h2 className='text-center'>loading...</h2>;

    const { displayName, photoURL } = userData;
    return (
        <main className='main'>
            <Details>
                <Avatar src={photoURL} size='17.5rem' margin='auto' />
                <div>
                    <Title>{displayName}</Title>
                </div>
            </Details>
        </main>
    );
};

export default UserDetails;

const Details = styled.article`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: 0 10px 15px rgba(var(--clr-rgb-black), 0.1);
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
    }
`;
