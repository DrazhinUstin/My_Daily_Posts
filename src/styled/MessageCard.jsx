import styled, { css } from 'styled-components';

export default styled.article`
    align-self: flex-start;
    position: relative;
    max-width: 15rem;
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
    .media {
        margin: 0.5rem 0;
        img {
            max-width: 10rem;
            border-radius: var(--radius);
            cursor: pointer;
        }
    }
    .date {
        color: var(--clr-dark-gray);
        text-align: right;
        font-size: 0.875rem;
    }
    .controls {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5rem;
        height: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 0.5rem;
        border-radius: inherit;
        background-color: rgba(var(--clr-rgb-black), 0.8);
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
