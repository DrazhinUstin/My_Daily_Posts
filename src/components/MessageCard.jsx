import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { MessageCard as Card, Avatar } from '../styled';

const MessageCard = ({ uid, displayName, photoURL, message, timestamp }) => {
    return (
        <Card isCurrentUser={uid === auth.currentUser.uid}>
            <Link to={uid === auth.currentUser.uid ? '/' : `/user/${uid}`}>
                <Avatar src={photoURL} size='2rem' />
            </Link>
            <div>
                <h4>{displayName}</h4>
                <p>{message}</p>
                <p className='date'>{formatTimestamp(timestamp)}</p>
            </div>
        </Card>
    );
};

export default MessageCard;
