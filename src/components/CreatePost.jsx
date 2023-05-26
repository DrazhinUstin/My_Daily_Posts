import { usePostContext } from '../contexts/PostContext';
import Button from '../styled/Button';
import { FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

const CreatePost = () => {
    const { dispatch } = usePostContext();
    return (
        <Wrapper>
            <Button $flex onClick={() => dispatch({ type: 'OPEN_EDITOR' })}>
                <FaPlus /> create post
            </Button>
        </Wrapper>
    );
};

export default CreatePost;

const Wrapper = styled.div`
    margin: 2rem 0;
    text-align: center;
`;
