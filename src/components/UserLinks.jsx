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
    display: flex;
    justify-content: center;
    column-gap: 0.25rem;
    margin: 2rem 0;
    a {
        min-width: 6rem;
        position: relative;
        display: inline-block;
        padding: 0.5rem;
        border-radius: 1rem 1rem 0 0;
        background-color: var(--clr-white);
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
