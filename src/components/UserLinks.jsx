import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const UserLinks = () => {
    return (
        <Wrapper>
            <NavLink to='.'>posts</NavLink>
            <NavLink to='connections'>connections</NavLink>
        </Wrapper>
    );
};

export default UserLinks;

const Wrapper = styled.nav`
    display: flex;
    column-gap: 0.5rem;
    margin: 2rem 0;
    a {
        position: relative;
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 1rem 1rem 0 0;
        background-color: var(--clr-gray);
        color: var(--clr-black);
        text-align: center;
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: capitalize;
        &.active {
            color: var(--clr-blue);
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 3px;
                background-color: var(--clr-blue);
            }
        }
    }
`;
