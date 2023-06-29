import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const UserLinks = () => {
    return (
        <Wrapper>
            <NavLink to='.' end>
                posts
            </NavLink>
            <NavLink to='personal'>personal</NavLink>
            <NavLink to='connections'>connections</NavLink>
        </Wrapper>
    );
};

export default UserLinks;

const Wrapper = styled.nav`
    width: max-content;
    margin: 2rem auto;
    border-radius: var(--radius);
    background-color: var(--clr-light-blue-2);
    a {
        min-width: 6rem;
        display: inline-block;
        padding: 0.5rem;
        border-radius: var(--radius);
        color: var(--clr-blue);
        text-align: center;
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: capitalize;
        &.active {
            background-color: var(--clr-blue);
            color: var(--clr-white);
        }
    }
`;
