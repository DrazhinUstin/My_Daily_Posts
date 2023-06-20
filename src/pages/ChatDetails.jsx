import { useState, useEffect, useRef } from 'react';
import { useParams, useOutletContext, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSnapshot, query, collection, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Loader, ChatHeader, MessageCard, MessageForm } from '../components';
import { ChatDetails as Container, Button } from '../styled';

const ChatDetails = ({ initialLimit = 10 }) => {
    const { id } = useParams();
    const currentChat = useOutletContext().find((chat) => id.includes(chat.uid));
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [currentLimit, setCurrentLimit] = useState(initialLimit);
    const [editableMessage, setEditableMessage] = useState(null);
    const msgsRef = useRef(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, `chats/${id}/messages`),
                orderBy('timestamp', 'desc'),
                limit(currentLimit)
            ),
            ({ docs }) => {
                setMessages(docs.map((doc) => ({ id: doc.id, ...doc.data() })).reverse());
                setIsLoading(false);
            },
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [id, currentLimit]);

    useEffect(() => {
        if (!isLoading) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
    }, [isLoading]);

    if (!currentChat) return <Navigate to='..' replace={true} />;

    return (
        <Container>
            <ChatHeader chatID={id} chat={currentChat} />
            <section className='messages' ref={msgsRef}>
                {isLoading && <Loader />}
                {messages.length === currentLimit && (
                    <Button onClick={() => setCurrentLimit(currentLimit + initialLimit)}>
                        load more
                    </Button>
                )}
                {messages.map((item, index) => {
                    const { displayName, photoURL } =
                        item.senderID === auth.currentUser.uid ? auth.currentUser : currentChat;
                    return (
                        <MessageCard
                            key={index}
                            chatID={id}
                            chatUID={currentChat.uid}
                            {...{ ...item, displayName, photoURL }}
                            isLastMessage={index === messages.length - 1}
                            editableMessage={editableMessage}
                            setEditableMessage={setEditableMessage}
                        />
                    );
                })}
            </section>
            <MessageForm
                chatID={id}
                chatUID={currentChat.uid}
                editableMessage={editableMessage}
                setEditableMessage={setEditableMessage}
            />
        </Container>
    );
};

export default ChatDetails;
