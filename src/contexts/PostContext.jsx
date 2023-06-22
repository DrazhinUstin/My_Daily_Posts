import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducers/postReducer';

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

const initialState = {
    isEditorOpen: false,
    editablePost: null,
};

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <PostContext.Provider value={{ ...state, dispatch }}>{children}</PostContext.Provider>;
};

export default PostProvider;
