import { NavLink } from 'react-router-dom';
import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { ChatList as List, Avatar } from '../styled';

const ChatList = ({ chats }) => {
    return (
        <List>
            {chats
                .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds)
                .map(({ uid, displayName, photoURL, message, timestamp }) => (
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
                                <p className='message'>{message}</p>
                            </div>
                        </li>
                    </NavLink>
                ))}
        </List>
    );
};

export default ChatList;
