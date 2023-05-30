import styled from 'styled-components';

export default styled.article`
    display: flex;
    column-gap: 0.5rem;
    &:not(:last-child) {
        margin-bottom: 0.75rem;
    }
    .container {
        min-width: 10rem;
        display: grid;
        gap: 0.25rem;
        padding: 0.5rem;
        border-radius: var(--radius);
        background-color: var(--clr-gray);
    }
    h4 {
        color: var(--clr-blue);
        font-weight: 500;
        letter-spacing: unset;
    }
    .date {
        text-align: right;
        font-size: 0.85rem;
    }
`;
