import { createContext, useContext, useReducer, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import reducer from '../reducers/postReducer';
import { toast } from 'react-toastify';

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const initialState = {
    posts: [],
    isEditorOpen: false,
    editablePost: null,
};

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'posts'),
                where('uid', '==', auth.currentUser.uid),
                orderBy('timestamp', 'desc')
            ),
            ({ docs }) =>
                dispatch({
                    type: 'SET_POSTS',
                    payload: docs.map((doc) => ({ id: doc.id, ...doc.data() })),
                })
        );
        return () => unsubscribe();
    }, []);

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
