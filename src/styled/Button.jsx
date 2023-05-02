import styled from 'styled-components';

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
    &:hover {
        filter: brightness(120%);
    }
`;

export default Button;
