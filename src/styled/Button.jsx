import styled, { css } from 'styled-components';

const Button = styled.button.attrs((props) => ({ type: props.type || 'button' }))`
    display: inline-block;
    padding: 0.5rem;
    border: none;
    border-radius: var(--radius);
    background-color: var(--clr-black);
    color: var(--clr-white);
    font-family: var(--font-family);
    font-size: 1rem;
    line-height: 1.25;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    transition: var(--trans-ease);
    ${(props) =>
        props.flex &&
        css`
            display: inline-flex;
            justify-content: center;
            align-items: center;
            column-gap: 0.5rem;
        `}
    ${(props) =>
        props.icon &&
        css`
            padding: 0.375rem;
            border-radius: 50%;
            font-size: 0.875rem;
        `}    
    &:hover {
        filter: brightness(120%);
    }
`;

export default Button;
