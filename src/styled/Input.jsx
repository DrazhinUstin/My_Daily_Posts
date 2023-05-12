import styled from 'styled-components';

const Input = styled.input.attrs((props) => ({ type: props.type || 'text' }))`
    padding: 0.375rem;
    border: 1px solid var(--clr-gray);
    border-radius: var(--radius);
    background-color: var(--clr-white);
    color: var(--clr-black);
    font-family: var(--font-family);
    font-size: 1rem;
    &::placeholder {
        color: var(--clr-gray);
    }
    &:focus {
        outline: none;
        border-color: var(--clr-blue);
        box-shadow: 0 0 0 1px var(--clr-blue);
    }
`;

export default Input;
