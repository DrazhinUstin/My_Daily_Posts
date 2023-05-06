const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return { ...state, posts: action.payload };
        case 'OPEN_EDITOR':
            return { ...state, isEditorOpen: true };
        case 'CLOSE_EDITOR':
            return { ...state, isEditorOpen: false, editablePost: null };
        case 'START_EDITING':
            return { ...state, editablePost: action.payload, isEditorOpen: true };
        default:
            throw Error(`Unknown action: ${action.type}`);
    }
};

export default reducer;
