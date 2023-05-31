import styled from 'styled-components';
import { breakpoints } from '../GlobalStyle';

export default styled.nav`
    position: sticky;
    top: 0;
    background-color: var(--clr-light-blue);
    box-shadow: var(--main-shadow);
    z-index: 999;
    & > * {
        height: var(--navbar-height);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .toggle-links-btn {
        display: none;
        border: none;
        background-color: transparent;
        color: var(--clr-blue);
        font-size: 1.2rem;
        transition: var(--trans-ease);
        &.rotate {
            transform: rotate(90deg);
        }
        @media ${breakpoints.sm} {
            display: block;
        }
    }
    .links {
        display: flex;
        a {
            position: relative;
            height: var(--navbar-height);
            display: flex;
            align-items: center;
            column-gap: 0.5rem;
            padding: 0 0.5rem;
            color: var(--clr-black);
            font-weight: 500;
            text-transform: capitalize;
            svg {
                font-size: 1.5rem;
            }
            &.active {
                color: var(--clr-blue);
                &::after {
                    content: '';
                    position: absolute;
                    top: calc(100% - 3px);
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background-color: var(--clr-blue);
                }
            }
        }
        @media ${breakpoints.sm} {
            position: fixed;
            top: var(--navbar-height);
            left: 0;
            bottom: 0;
            width: 200px;
            transform: translateX(-100%);
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            background-color: var(--clr-white);
            box-shadow: var(--main-shadow);
            transition: var(--trans-ease);
            transition-property: transform;
            &.open {
                transform: translateX(0);
            }
            a {
                height: auto;
                padding: 0.5rem 0;
            }
        }
    }
    .user {
        position: relative;
        img {
            cursor: pointer;
        }
        &-menu {
            position: absolute;
            top: calc(100% + 0.5rem);
            right: 0;
            width: max-content;
            border-radius: var(--radius);
            background-color: var(--clr-white);
            box-shadow: var(--main-shadow);
            a,
            button {
                display: flex;
                justify-content: center;
                align-items: center;
                column-gap: 0.5rem;
                padding: 0.5rem;
                color: var(--clr-black);
                text-transform: capitalize;
                svg {
                    color: var(--clr-blue);
                    font-size: 1.2rem;
                }
            }
            button {
                border: none;
                background-color: transparent;
                font-family: var(--font-family);
                font-size: 1rem;
                svg {
                    color: var(--clr-red);
                }
            }
        }
    }
`;
