import styled from 'styled-components';

const TextButton = styled.button.attrs((props) => ({ type: props.type || 'button' }))`
    display: inline-block;
    border: none;
    background-color: transparent;
    color: var(--clr-black);
    font-family: var(--font-family);
    font-size: 1rem;
    font-weight: 500;
    text-transform: capitalize;
    &:hover {
        text-decoration: underline;
    }
`;

export default TextButton;
