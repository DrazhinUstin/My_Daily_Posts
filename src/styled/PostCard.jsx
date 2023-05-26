import styled from 'styled-components';

export default styled.article`
    position: relative;
    max-width: 600px;
    width: 100%;
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: 0 10px 15px rgba(var(--clr-rgb-black), 0.1);
    .header {
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
    & > img {
        width: 100%;
        border-radius: var(--radius);
    }
`;
