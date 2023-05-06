import { useAuthContext } from '../contexts/AuthContext';
import { usePostContext } from '../contexts/PostContext';
import { formatTimestamp } from '../utils/helpers';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { PostCard as Card, Button } from '../styled';

const PostCard = ({ post }) => {
    const { user } = useAuthContext();
    const { dispatch } = usePostContext();
    return (
        <Card>
            {post.uid === user.uid && (
                <div className='controls'>
                    <Button icon onClick={() => dispatch({ type: 'START_EDITING', payload: post })}>
                        <FaEdit />
                    </Button>
                    <Button icon>
                        <FaTrashAlt />
                    </Button>
                </div>
            )}
            <p className='date'>{post.timestamp && formatTimestamp(post.timestamp)}</p>
            <div className='html' dangerouslySetInnerHTML={{ __html: post.message }} />
            {post.imageURL && <img src={post.imageURL} alt='post_image' />}
        </Card>
    );
};

export default PostCard;
