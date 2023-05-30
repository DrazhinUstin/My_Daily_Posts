import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { CommentCard as Card, Avatar } from '../styled';

const CommentCard = ({ uid, photoURL, displayName, message, timestamp }) => {
    return (
        <Card>
            <Link to={uid === auth.currentUser.uid ? '/' : `/user/${uid}`}>
                <Avatar src={photoURL} size='2rem' />
            </Link>
            <div className='container'>
                <Link to={uid === auth.currentUser.uid ? '/' : `/user/${uid}`}>
                    <h4>{displayName}</h4>
                </Link>
                <p>{message}</p>
                <p className='date'>{formatTimestamp(timestamp)}</p>
            </div>
        </Card>
    );
};

export default CommentCard;
