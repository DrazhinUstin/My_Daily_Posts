import { breakpoints } from '../GlobalStyle';
import styled from 'styled-components';

export default styled.main.attrs(() => ({ className: 'main' }))`
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: flex-start;
    gap: 2rem;
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
    }
    .sidebar {
        display: flex;
        flex-direction: column;
        border-radius: var(--radius);
        overflow: hidden;
        background-color: var(--clr-white);
        box-shadow: var(--main-shadow);
        a {
            position: relative;
            display: inline-flex;
            align-items: center;
            column-gap: 0.5rem;
            padding: 0.25rem 0.5rem 0.25rem 1rem;
            color: var(--clr-black);
            font-weight: 500;
            text-transform: capitalize;
            &:hover,
            &.active {
                background-color: var(--clr-light-blue-2);
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
    .outlet {
        display: flex;
        justify-content: center;
    }
`;
