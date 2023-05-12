import { Link } from 'react-router-dom';
import { Avatar, Button } from '../styled';
import styled from 'styled-components';

const UserCard = ({ uid, photoURL, displayName }) => {
    return (
        <Wrapper key={uid}>
            <Avatar src={photoURL} size='5rem' margin='auto' />
            <h4>{displayName}</h4>
            <Button as={Link} to={`/user/${uid}`}>
                view
            </Button>
        </Wrapper>
    );
};

export default UserCard;

const Wrapper = styled.article`
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: 0 10px 15px rgba(var(--clr-rgb-black), 0.1);
    text-align: center;
    h4 {
        margin: 1rem 0;
        text-transform: unset;
        letter-spacing: unset;
    }
    ${Button} {
        display: block;
    }
`;
