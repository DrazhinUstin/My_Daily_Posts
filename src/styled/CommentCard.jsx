import styled, { css } from 'styled-components';

export default styled.article`
    display: flex;
    column-gap: 0.5rem;
    &:not(:last-child) {
        margin-bottom: 0.75rem;
    }
    .container {
        max-width: 17.5rem;
        min-width: 12.5rem;
        display: grid;
        gap: 0.25rem;
        padding: 0.5rem;
        border-radius: var(--radius);
        background-color: ${(props) =>
            props.fromCurrentUser ? 'var(--clr-light-blue-2)' : 'var(--clr-light-gray)'};
        ${(props) =>
            props.isEditable &&
            css`
                box-shadow: inset 0 0 0 2px var(--clr-blue);
            `}
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            column-gap: 0.5rem;
            h4 {
                color: var(--clr-blue);
                font-weight: 500;
            }
            .controls {
                display: flex;
                column-gap: 0.25rem;
            }
        }
        .date {
            text-align: right;
            font-size: 0.85rem;
        }
    }
`;
