import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisH, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, collection, getDocs, writeBatch, deleteField } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage, auth } from '../firebase';
import { Button, GreenButton, AlertButton, Avatar } from '../styled';

const ChatHeader = ({ chatID, chat }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const deleteChat = async () => {
        setIsLoading(true);
        try {
            const { docs } = await getDocs(collection(db, `chats/${chatID}/messages`));
            const values = await Promise.allSettled(
                docs
                    .filter((doc) => doc.data().imageURL)
                    .map((doc) => deleteObject(ref(storage, `chats/${chatID}/${doc.id}`)))
            );
            if (
                values.find(
                    (val) =>
                        val.status === 'rejected' && val.reason?.code !== 'storage/object-not-found'
                )
            )
                throw Error({ message: val.reason?.message || 'There was an error...' });
            const chunks = [];
            for (let i = 0; i < docs.length; i += 500) {
                chunks.push(docs.slice(i, i + 500));
            }
            chunks.forEach(async (chunk) => {
                const batch = writeBatch(db);
                chunk.forEach((doc) => batch.delete(doc.ref));
                await batch.commit();
            });
            const batch = writeBatch(db);
            batch.update(doc(db, `users/${auth.currentUser.uid}`), {
                [`chats.${chat.uid}`]: deleteField(),
            });
            batch.update(doc(db, `users/${chat.uid}`), {
                [`chats.${auth.currentUser.uid}`]: deleteField(),
            });
            batch.delete(doc(db, `chats/${chatID}`));
            await batch.commit();
            navigate('..');
            toast.success('Chat was successfully deleted!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <header className='chat-header'>
            <GreenButton as={Link} to='..' $icon>
                <FaArrowLeft />
            </GreenButton>
            <Link to={`/user/${chat.uid}`}>
                <div className='user-info '>
                    <Avatar src={chat.photoURL} />
                    <h4>{chat.displayName}</h4>
                </div>
            </Link>
            <div className='menu'>
                <Button onClick={() => setIsMenuOpen(!isMenuOpen)} $icon>
                    <FaEllipsisH />
                </Button>
                {isMenuOpen && (
                    <div className='menu-items'>
                        <AlertButton onClick={deleteChat} disabled={isLoading} $flex>
                            <FaTrashAlt /> delete chat
                        </AlertButton>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ChatHeader;
