import styled from 'styled-components';

export default styled.div`
    .messages {
        display: grid;
        row-gap: 1rem;
        padding: 1rem;
        border-radius: var(--radius);
        box-shadow: var(--main-shadow);
        background-color: var(--clr-white);
        & > button {
            justify-self: center;
        }
    }
`;
