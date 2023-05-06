import { createContext, useContext, useReducer, useEffect } from 'react';
import { query, collection, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import reducer from '../reducers/postReducer';

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

    return <PostContext.Provider value={{ ...state, dispatch }}>{children}</PostContext.Provider>;
};

export default PostProvider;
