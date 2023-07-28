import styled from 'styled-components';

export default styled.ul.attrs({ className: 'content-card' })`
    margin: auto;
    overflow: hidden;
    &&& {
        padding: 0;
    }
    li {
        display: grid;
        grid-template-columns: auto 1fr;
        column-gap: 0.5rem;
        padding: 0.5rem 1rem;
        border-bottom: 1px solid var(--clr-light-gray);
        color: var(--clr-black);
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.25rem;
        }
        .date {
            color: var(--clr-dark-gray);
            font-size: 0.875rem;
        }
        .message {
            display: flex;
            column-gap: 0.25rem;
            padding: 0.25rem;
            border-radius: var(--radius);
            background-color: var(--clr-light-blue-2);
        }
    }
    a:last-child li {
        border-bottom: 0;
    }
    li:hover {
        background-color: var(--clr-light-blue);
    }
`;
