import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSnapshot, query, collection, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { MessageCard, MessageForm } from '../components';
import { ChatDetails as Container, Button } from '../styled';

const ChatDetails = ({ initialLimit = 10 }) => {
    const { id } = useParams();
    const currentChat = useOutletContext().find((chat) => id.includes(chat.uid));
    const [messages, setMessages] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, `chats/${id}/messages`),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => setMessages(docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse()),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [id, currentLimit]);

    return (
        <Container>
            <section className='messages'>
                {messages.length === currentLimit && (
                    <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                        load more
                    </Button>
                )}
                {messages.map((item, index) => {
                    const { displayName, photoURL } =
                        item.uid === auth.currentUser.uid ? auth.currentUser : currentChat;
                    return <MessageCard key={index} {...{ ...item, displayName, photoURL }} />;
                })}
            </section>
            <MessageForm chatID={id} uid={currentChat.uid} />
        </Container>
    );
};

export default ChatDetails;
