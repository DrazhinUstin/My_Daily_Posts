import { useState } from 'react';
import { toast } from 'react-toastify';
import { doc, collection, getDocs, writeBatch, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import { usePostContext } from '../contexts/PostContext';
import { Button, AlertButton } from '../styled';
import { FaEllipsisH, FaEdit, FaTrashAlt } from 'react-icons/fa';

const PostCardMenu = ({ post }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { dispatch } = usePostContext();

    const deletePost = async () => {
        setIsLoading(true);
        try {
            if (post.imageURLS.length) {
                const values = await Promise.allSettled(
                    post.imageURLS.map((_, index) =>
                        deleteObject(ref(storage, `posts/${post.id}/${index}`))
                    )
                );
                const rejectedVal = values.find(
                    (val) =>
                        val.status === 'rejected' && val.reason?.code !== 'storage/object-not-found'
                );
                if (rejectedVal) throw Error(rejectedVal.reason?.message || 'There was an error');
            }
            const { docs } = await getDocs(collection(db, `posts/${post.id}/comments`));
            const chunks = [];
            for (let i = 0; i < docs.length; i += 500) {
                chunks.push(docs.slice(i, i + 500));
            }
            await Promise.all(
                chunks.map((chunk) => {
                    const batch = writeBatch(db);
                    chunk.forEach((doc) => batch.delete(doc.ref));
                    return batch.commit();
                })
            );
            await deleteDoc(doc(db, `posts/${post.id}`));
            toast.success('Post was deleted!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className='controls'>
            <Button $icon onClick={() => setIsMenuOpen(!isMenuOpen)} disabled={isLoading}>
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
                    <AlertButton $flex onClick={deletePost}>
                        <FaTrashAlt /> delete
                    </AlertButton>
                </div>
            )}
        </div>
    );
};

export default PostCardMenu;
