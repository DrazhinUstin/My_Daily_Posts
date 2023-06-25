import styled from 'styled-components';

export default styled.div`
    --chat-header-height: 4rem;
    --chat-form-height: 4rem;
    max-width: 600px;
    margin: auto;
    border-radius: var(--radius);
    box-shadow: var(--main-shadow);
    background-color: var(--clr-white);
    .chat-header {
        height: var(--chat-header-height);
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 0.5rem;
        padding: 0 1rem;
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
                z-index: 1;
                & > * {
                    border-radius: 0;
                }
            }
        }
    }
    .messages {
        height: calc(var(--main-fullscreen) - var(--chat-header-height) - var(--chat-form-height));
        overflow-y: auto;
        scroll-behavior: smooth;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        padding: 1rem;
        border-top: 1px solid var(--clr-light-gray);
        border-bottom: 1px solid var(--clr-light-gray);
        & > button {
            align-self: center;
        }
        & ~ form {
            height: var(--chat-form-height);
            align-items: center;
            padding: 0 1rem;
            box-shadow: unset;
        }
    }
`;
