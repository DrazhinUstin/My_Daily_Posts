import { Link } from 'react-router-dom';
import { FaUserEdit } from 'react-icons/fa';
import { auth } from '../firebase';
import ConnectionBtn from './ConnectionBtn';
import { Avatar, Title, Button } from '../styled';
import { breakpoints } from '../GlobalStyle';
import styled from 'styled-components';

const ProfileHeader = ({ photoURL, displayName, uid, connections }) => {
    return (
        <Header>
            <div className='info'>
                <Avatar src={photoURL} size='10rem' margin='auto' />
                <Title>{displayName}</Title>
            </div>
            {uid === auth.currentUser.uid ? (
                <Button as={Link} to='/settings/profile' $flex>
                    <FaUserEdit /> edit profile
                </Button>
            ) : (
                <ConnectionBtn uid={uid} connections={connections} />
            )}
        </Header>
    );
};

export default ProfileHeader;

const Header = styled.header`
    max-width: 600px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    margin: 0 auto;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--main-shadow);
    background-color: var(--clr-white);
    .info {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 1em;
    }
    @media ${breakpoints.sm} {
        flex-direction: column;
        align-items: center;
        .info {
            grid-template-columns: unset;
        }
    }
`;
