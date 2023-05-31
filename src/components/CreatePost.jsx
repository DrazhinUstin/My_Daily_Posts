import { usePostContext } from '../contexts/PostContext';
import Button from '../styled/Button';
import { FaPlus } from 'react-icons/fa';

const CreatePost = () => {
    const { dispatch } = usePostContext();
    return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
            <Button $flex onClick={() => dispatch({ type: 'OPEN_EDITOR' })}>
                <FaPlus /> create post
            </Button>
        </div>
    );
};

export default CreatePost;
