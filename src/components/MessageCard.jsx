import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { MessageCard as Card, Avatar, Button, AlertButton } from '../styled';

const MessageCard = ({
    id,
    uid,
    displayName,
    photoURL,
    message,
    imageURL,
    timestamp,
    isLastMessage,
    editableMessage,
    setEditableMessage,
}) => {
    const isCurrentUser = uid === auth.currentUser.uid;
    const isEditable = id === editableMessage?.id;
    return (
        <Card isCurrentUser={isCurrentUser} isEditable={isEditable}>
            <Link to={isCurrentUser ? '/' : `/user/${uid}`}>
                <Avatar src={photoURL} size='2rem' />
            </Link>
            <div>
                <h4>{displayName}</h4>
                <p>{message}</p>
                {imageURL && <img src={imageURL} alt='message-image' />}
                <p className='date'>{formatTimestamp(timestamp)}</p>
            </div>
            {isCurrentUser && (
                <div className='controls'>
                    <Button
                        $icon
                        onClick={() =>
                            setEditableMessage(
                                !isEditable ? { id, message, imageURL, isLastMessage } : null
                            )
                        }
                    >
                        <FaEdit />
                    </Button>
                    <AlertButton $icon>
                        <FaTrashAlt />
                    </AlertButton>
                </div>
            )}
        </Card>
    );
};

export default MessageCard;
