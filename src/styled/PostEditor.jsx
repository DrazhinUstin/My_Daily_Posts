import styled from 'styled-components';

export default styled.div`
    position: relative;
    max-width: 500px;
    width: 90vw;
    padding: 1rem;
    border-radius: var(--radius);
    background-color: var(--clr-white);
    .close-btn {
        position: absolute;
        top: -0.875rem;
        right: -0.875rem;
    }
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        label {
            color: var(--clr-green);
        }
    }
    img[alt='preview'] {
        width: 3rem;
        display: inline-block;
        margin-right: 0.25rem;
        border-radius: var(--radius);
    }
`;
