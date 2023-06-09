import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaEllipsisH, FaTrashAlt } from 'react-icons/fa';
import { Button, GreenButton, AlertButton, Avatar } from '../styled';

const ChatHeader = ({ chat }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
                        <AlertButton $flex>
                            <FaTrashAlt /> delete chat
                        </AlertButton>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ChatHeader;
