import styled from 'styled-components';

const GridForm = styled.form`
    max-width: ${(props) => props.maxWidth || '500px'};
    width: 100%;
    display: grid;
    row-gap: 1rem;
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding || '1rem'};
    border-radius: var(--radius);
    box-shadow: var(--main-shadow);
    background-color: var(--clr-white);
    text-align: center;
    label {
        display: block;
        margin-bottom: 0.5rem;
        text-align: left;
    }
    input,
    select,
    textarea {
        width: 100%;
    }
`;

export default GridForm;
