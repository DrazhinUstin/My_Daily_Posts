import ConnectionBtn from './ConnectionBtn';
import { Avatar, Title } from '../styled';
import { breakpoints } from '../GlobalStyle';
import styled from 'styled-components';

const ProfileHeader = ({ photoURL, displayName, uid, connections }) => {
    return (
        <Header>
            <div className='info'>
                <Avatar src={photoURL} size='10rem' margin='auto' />
                <Title>{displayName}</Title>
            </div>
            <ConnectionBtn uid={uid} connections={connections} />
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
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: 0 10px 15px rgba(var(--clr-rgb-black), 0.1);
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
