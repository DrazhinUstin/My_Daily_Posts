import styled from 'styled-components';

export default styled.article`
    position: relative;
    max-width: 600px;
    width: 100%;
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--clr-gray);
    border-radius: var(--radius);
    .controls {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }
    .date {
        font-size: 0.875rem;
    }
    img {
        width: 100%;
        border-radius: var(--radius);
    }
`;
