import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Loader } from '../components';

const Chats = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'users'), where(`chats.${auth.currentUser.uid}`, '!=', null)),
            ({ docs }) => {
                setChatList(
                    docs.map((doc) => {
                        const { uid, displayName, photoURL, chats } = doc.data();
                        return { uid, displayName, photoURL, ...chats[auth.currentUser.uid] };
                    })
                );
                setIsLoading(false);
            },
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, []);

    if (isLoading) return <Loader fullscreen />;

    if (!chatList.length)
        return (
            <main className='main grid-center'>
                <h3 className='text-center'>You don't have any chats yet...</h3>
            </main>
        );

    return (
        <main className='main'>
            <Outlet context={chatList} />
        </main>
    );
};

export default Chats;
