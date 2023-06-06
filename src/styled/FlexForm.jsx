import styled from 'styled-components';

const FlexForm = styled.form`
    display: flex;
    column-gap: 0.5rem;
    padding: 1rem;
    border-radius: var(--radius);
    box-shadow: var(--main-shadow);
    background-color: var(--clr-white);
    input {
        width: 100%;
    }
    button {
        position: relative;
    }
    img[alt='preview'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: var(--radius);
        object-fit: cover;
    }
`;

export default FlexForm;
