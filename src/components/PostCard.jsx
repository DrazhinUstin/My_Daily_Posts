import { useState } from 'react';
import { FaComments, FaRegComments } from 'react-icons/fa';
import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { PostCardMenu, PostCardLikes, PostCardComments } from './';
import { PostCard as Card, Avatar } from '../styled';

const PostCard = ({ post }) => {
    const [areCommentsOpen, setAreCommentsOpen] = useState(false);
    return (
        <Card>
            <header>
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
                <button
                    className='comment-btn'
                    onClick={() => setAreCommentsOpen(!areCommentsOpen)}
                >
                    {post.commentsAmount}
                    {areCommentsOpen ? <FaComments /> : <FaRegComments />}
                </button>
            </footer>
            {areCommentsOpen && <PostCardComments postID={post.id} />}
        </Card>
    );
};

export default PostCard;
