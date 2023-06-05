import styled, { css } from 'styled-components';

export default styled.article`
    justify-self: flex-start;
    max-width: 20rem;
    min-width: 10rem;
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    column-gap: 0.5rem;
    padding: 0.5rem;
    border-radius: var(--radius);
    background-color: var(--clr-light-blue-2);
    h4 {
        letter-spacing: unset;
    }
    .date {
        color: var(--clr-dark-gray);
        text-align: right;
        font-size: 0.875rem;
    }
    ${(props) =>
        !props.isCurrentUser &&
        css`
            justify-self: flex-end;
            background-color: var(--clr-light-gray);
        `}
`;
