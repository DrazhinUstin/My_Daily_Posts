import { useAuthContext } from '../contexts/AuthContext';
import { formatTimestamp } from '../utils/helpers';
import { PostCardMenu } from './';
import { PostCard as Card } from '../styled';
import default_user from '../assets/default_user.svg';

const PostCard = ({ post }) => {
    const { user } = useAuthContext();
    return (
        <Card>
            <header className='header'>
                <div className='user'>
                    <img src={user.photoURL || default_user} alt='avatar' />
                    <div>
                        <h4>{user.displayName}</h4>
                        <p>{post.timestamp && formatTimestamp(post.timestamp)}</p>
                    </div>
                </div>
                {post.uid === user.uid && <PostCardMenu post={post} />}
            </header>
            <div className='html' dangerouslySetInnerHTML={{ __html: post.message }} />
            {post.imageURL && <img src={post.imageURL} alt='post_image' />}
        </Card>
    );
};

export default PostCard;
