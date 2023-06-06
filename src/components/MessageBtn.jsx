import { useState } from 'react';
import { FaComment, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, collection, runTransaction, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { GreenButton, Substrate, GridForm, Input, AlertButton, Button } from '../styled';
import styled from 'styled-components';

const MessageBtn = ({ uid }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const { message } = Object.fromEntries(new FormData(e.currentTarget));
        const chatID =
            auth.currentUser.uid > uid ? auth.currentUser.uid + uid : uid + auth.currentUser.uid;
        const chatRef = doc(db, 'chats', chatID);
        const msgRef = doc(collection(chatRef, 'messages'));
        try {
            await runTransaction(db, async (transaction) => {
                const chatDoc = await transaction.get(chatRef);
                if (!chatDoc.exists()) {
                    transaction.set(chatRef, {});
                }
                transaction.set(msgRef, {
                    uid: auth.currentUser.uid,
                    message,
                    timestamp: serverTimestamp(),
                });
                transaction.update(doc(db, `users/${auth.currentUser.uid}`), {
                    [`chats.${uid}`]: {
                        message,
                        timestamp: serverTimestamp(),
                    },
                });
                transaction.update(doc(db, `users/${uid}`), {
                    [`chats.${auth.currentUser.uid}`]: {
                        message,
                        timestamp: serverTimestamp(),
                    },
                });
            });
            toast.success('Message was send!');
            setIsFormOpen(false);
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <>
            <GreenButton onClick={() => setIsFormOpen(true)} disabled={isLoading} $flex>
                <FaComment />
                message
            </GreenButton>
            {isFormOpen && (
                <Substrate>
                    <Form onSubmit={sendMessage}>
                        <AlertButton onClick={() => setIsFormOpen(false)} $icon>
                            <FaTimes />
                        </AlertButton>
                        <Input
                            as='textarea'
                            name='message'
                            placeholder='Write a message...'
                            maxLength={200}
                            disabled={isLoading}
                            autoFocus
                            required
                        />
                        <Button type='submit' disabled={isLoading}>
                            send message
                        </Button>
                    </Form>
                </Substrate>
            )}
        </>
    );
};

export default MessageBtn;

const Form = styled(GridForm)`
    position: relative;
    ${AlertButton} {
        position: absolute;
        top: -0.875rem;
        right: -0.875rem;
    }
`;