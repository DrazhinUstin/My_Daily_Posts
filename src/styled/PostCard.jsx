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
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            object-fit: cover;
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
            background-color: var(--clr-black);
        }
    }
    img {
        width: 100%;
        border-radius: var(--radius);
    }
`;
