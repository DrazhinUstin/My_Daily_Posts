import styled from 'styled-components';

const GridForm = styled.form`
    max-width: ${(props) => props.maxWidth || '500px'};
    width: 100%;
    display: grid;
    row-gap: 1rem;
    padding: 1rem;
    text-align: center;
    input,
    select {
        width: 100%;
    }
`;

export default GridForm;
