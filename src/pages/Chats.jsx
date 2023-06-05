import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import ChatList from '../components/ChatList';
import styled from 'styled-components';

const Chats = () => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'users'), where(`chats.${auth.currentUser.uid}`, '!=', null)),
            ({ docs }) =>
                setChatList(
                    docs.map((doc) => {
                        const { uid, displayName, photoURL, chats } = doc.data();
                        return { uid, displayName, photoURL, ...chats[auth.currentUser.uid] };
                    })
                ),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, []);

    return (
        <Wrapper className='main'>
            <ChatList chats={chatList} />
            <Outlet context={chatList} />
        </Wrapper>
    );
};

export default Chats;

const Wrapper = styled.main`
    display: grid;
    grid-template-columns: 20rem 1fr;
    align-items: flex-start;
    gap: 2rem;
`;
