import styled from 'styled-components';

export default styled.div`
    position: relative;
    padding: 1rem;
    border-radius: var(--radius);
    background-color: var(--clr-white);
    .close-btn {
        position: absolute;
        top: -0.875rem;
        right: -0.875rem;
    }
    .quill {
        margin: 1rem 0;
    }
    .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img[alt='preview'] {
        width: 5rem;
        border-radius: var(--radius);
    }
`;
