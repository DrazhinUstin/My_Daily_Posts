import PostCard from './PostCard';
import styled from 'styled-components';

const Posts = ({ posts }) => {
    return (
        <Wrapper>
            {posts.map((post, index) => (
                <PostCard key={index} post={post} />
            ))}
        </Wrapper>
    );
};

export default Posts;

const Wrapper = styled.div`
    display: grid;
    row-gap: 2rem;
`;
