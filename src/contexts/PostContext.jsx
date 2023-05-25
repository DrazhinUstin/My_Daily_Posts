import { createContext, useContext, useReducer } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase';
import reducer from '../reducers/postReducer';
import { toast } from 'react-toastify';

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const initialState = {
    isEditorOpen: false,
    editablePost: null,
};

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const deletePost = async (post) => {
        try {
            await deleteDoc(doc(db, `posts/${post.id}`));
            if (post.imageURL) await deleteObject(ref(storage, `posts/${post.id}`));
            toast.success('Post was deleted!');
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <PostContext.Provider value={{ ...state, dispatch, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

export default PostProvider;
