import { useState } from 'react';
import { usePostContext } from '../contexts/PostContext';
import { Button, AlertButton } from '../styled';
import { FaEllipsisH, FaEdit, FaTrashAlt } from 'react-icons/fa';

const PostCardMenu = ({ post }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { dispatch, deletePost } = usePostContext();
    return (
        <div className='controls'>
            <Button $icon onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FaEllipsisH />
            </Button>
            {isMenuOpen && (
                <div className='controls-menu' onClick={() => setIsMenuOpen(false)}>
                    <Button
                        $flex
                        onClick={() => dispatch({ type: 'START_EDITING', payload: post })}
                    >
                        <FaEdit /> edit
                    </Button>
                    <AlertButton $flex onClick={() => deletePost(post)}>
                        <FaTrashAlt /> delete
                    </AlertButton>
                </div>
            )}
        </div>
    );
};

export default PostCardMenu;
