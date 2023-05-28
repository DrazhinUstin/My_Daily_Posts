import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { PostCardMenu, PostCardLikes } from './';
import { PostCard as Card, Avatar } from '../styled';

const PostCard = ({ post }) => {
    return (
        <Card>
            <header className='header'>
                <div className='user'>
                    <Avatar src={post.photoURL} />
                    <div>
                        <h4>{post.displayName}</h4>
                        <p>{post.timestamp && formatTimestamp(post.timestamp)}</p>
                    </div>
                </div>
                {post.uid === auth.currentUser.uid && <PostCardMenu post={post} />}
            </header>
            <div className='html' dangerouslySetInnerHTML={{ __html: post.message }} />
            {post.imageURL && <img src={post.imageURL} alt='post_image' />}
            <footer>
                <PostCardLikes postID={post.id} likes={post.likes} />
            </footer>
        </Card>
    );
};

export default PostCard;
