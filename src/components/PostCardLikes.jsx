import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';

const PostCardLikes = ({ postID, likes = [] }) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleLike = async () => {
        setIsLoading(true);
        try {
            await updateDoc(doc(db, 'posts', postID), {
                likes: !isPostLiked
                    ? arrayUnion(auth.currentUser.uid)
                    : arrayRemove(auth.currentUser.uid),
            });
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const isPostLiked = likes.find((item) => item === auth.currentUser.uid);
    return (
        <button className='likes' onClick={toggleLike} disabled={isLoading}>
            {isPostLiked ? <FaHeart /> : <FaRegHeart />}
            {likes.length || null}
        </button>
    );
};

export default PostCardLikes;
