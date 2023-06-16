import { useOutletContext, NavLink } from 'react-router-dom';
import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { ChatList as List, Avatar } from '../styled';

const ChatList = () => {
    const chats = useOutletContext();
    return (
        <List>
            {chats
                .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
                .map(({ uid, displayName, photoURL, senderID, message, timestamp }) => (
                    <NavLink
                        key={uid}
                        to={
                            auth.currentUser.uid > uid
                                ? auth.currentUser.uid + uid
                                : uid + auth.currentUser.uid
                        }
                    >
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
                    </NavLink>
                ))}
        </List>
    );
};

export default ChatList;
