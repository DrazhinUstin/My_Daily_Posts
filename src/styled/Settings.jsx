import { breakpoints } from '../GlobalStyle';
import styled from 'styled-components';

export default styled.main.attrs(() => ({ className: 'main' }))`
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
    }
    .sidebar {
        display: flex;
        flex-direction: column;
        a {
            position: relative;
            display: inline-flex;
            align-items: center;
            column-gap: 0.5rem;
            padding: 0.25rem 0.5rem 0.25rem 1rem;
            border-radius: var(--radius);
            color: var(--clr-black);
            font-weight: 500;
            text-transform: capitalize;
            &:hover,
            &.active {
                background-color: rgba(var(--clr-rgb-black), 0.1);
                color: var(--clr-blue);
            }
            &.active::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                border-radius: var(--radius);
                background-color: var(--clr-blue);
            }
        }
    }
`;
