import styled, { css } from 'styled-components';

export default styled.article`
    align-self: flex-start;
    position: relative;
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
    h4 ~ img {
        width: 15rem;
        margin: 0.5rem 0;
        border-radius: var(--radius);
    }
    .date {
        color: var(--clr-dark-gray);
        text-align: right;
        font-size: 0.875rem;
    }
    .controls {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 0.5rem;
        border-radius: inherit;
        background-color: inherit;
        opacity: 0;
        visibility: hidden;
        transition: var(--trans-ease);
    }
    &:hover .controls {
        opacity: 1;
        visibility: visible;
    }
    ${(props) =>
        !props.isCurrentUser &&
        css`
            align-self: flex-end;
            background-color: var(--clr-light-gray);
        `}
    ${(props) =>
        props.isEditable &&
        css`
            box-shadow: 0 0 0 2px var(--clr-blue);
        `}
`;
