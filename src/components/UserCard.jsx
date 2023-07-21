import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { Avatar, Button } from '../styled';
import styled from 'styled-components';

const UserCard = ({ uid, photoURL, displayName }) => {
    return (
        <Wrapper>
            <Avatar src={photoURL} size='5rem' margin='auto' />
            <h4>{displayName}</h4>
            <Button as={Link} to={uid === auth.currentUser.uid ? '/' : `/user/${uid}`}>
                view
            </Button>
        </Wrapper>
    );
};

export default UserCard;

const Wrapper = styled.article.attrs({ className: 'content-card' })`
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
