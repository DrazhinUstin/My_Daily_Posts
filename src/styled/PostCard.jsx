import styled from 'styled-components';

export default styled.article`
    position: relative;
    max-width: 600px;
    width: 100%;
    display: grid;
    row-gap: 1rem;
    margin: 0 auto;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--main-shadow);
    background-color: var(--clr-white);
    & > header {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        column-gap: 0.5rem;
    }
    .user {
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        img {
            flex-shrink: 0;
        }
        h4 {
            letter-spacing: unset;
        }
        p {
            font-size: 0.875rem;
        }
    }
    .controls {
        position: relative;
        &-menu {
            position: absolute;
            top: calc(100% + 0.25rem);
            right: 0;
            width: max-content;
            display: grid;
            border-radius: var(--radius);
            overflow: hidden;
            button {
                border-radius: 0;
            }
        }
    }
    .html {
        a {
            color: var(--clr-blue);
            text-decoration: underline;
        }
        ul,
        ol {
            padding-left: 1.5rem;
        }
        li {
            list-style-type: inherit;
            list-style-position: inside;
        }
    }
    .images {
        display: flex;
        flex-flow: row wrap;
        gap: 0.25rem;
        img {
            width: 6rem;
            border-radius: var(--radius);
            cursor: pointer;
        }
    }
    & > footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        border-top: 1px solid var(--clr-gray);
        .likes,
        .comment-btn {
            display: grid;
            grid-template-columns: auto 1fr;
            align-items: center;
            column-gap: 0.25rem;
            border: none;
            background-color: transparent;
            color: var(--clr-red);
            font-family: var(--font-family);
            font-size: 1rem;
        }
        .comment-btn {
            color: var(--clr-blue);
            svg {
                font-size: 1.375rem;
            }
        }
    }
`;
