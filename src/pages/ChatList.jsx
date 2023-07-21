import { useOutletContext, Link } from 'react-router-dom';
import { auth } from '../firebase';
import { calculateChatID, formatTimestamp } from '../utils/helpers';
import { ChatList as List, Avatar } from '../styled';

const ChatList = () => {
    const chats = useOutletContext();
    return (
        <List>
            {chats
                .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
                .map(({ uid, displayName, photoURL, senderID, message, timestamp }) => (
                    <Link key={uid} to={calculateChatID(auth.currentUser.uid, uid)}>
                        <li>
                            <Avatar src={photoURL} />
                            <div>
                                <header>
                                    <h4>{displayName}</h4>
                                    <p className='date'>{formatTimestamp(timestamp)}</p>
                                </header>
                                <p className='message'>
                                    {senderID === auth.currentUser.uid && (
                                        <Avatar src={auth.currentUser.photoURL} size='1.5rem' />
                                    )}
                                    {message}
                                </p>
                            </div>
                        </li>
                    </Link>
                ))}
        </List>
    );
};

export default ChatList;
