import styled from 'styled-components';

export default styled.div`
    display: grid;
    row-gap: 1rem;
    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 0.5rem;
        padding: 1rem;
        border-radius: var(--radius);
        box-shadow: var(--main-shadow);
        background-color: var(--clr-white);
        .user-info {
            display: flex;
            align-items: center;
            column-gap: 0.5rem;
            color: var(--clr-black);
            h4 {
                letter-spacing: unset;
            }
        }
        .menu {
            position: relative;
            &-items {
                position: absolute;
                top: calc(100% + 0.25rem);
                right: 0;
                width: max-content;
                display: grid;
                border-radius: var(--radius);
                box-shadow: var(--main-shadow);
                overflow: hidden;
                & > * {
                    border-radius: 0;
                }
            }
        }
    }
    .messages {
        display: grid;
        row-gap: 1rem;
        padding: 1rem;
        border-radius: var(--radius);
        box-shadow: var(--main-shadow);
        background-color: var(--clr-white);
        & > button {
            justify-self: center;
        }
    }
`;
