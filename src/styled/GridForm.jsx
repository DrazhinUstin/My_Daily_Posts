import styled from 'styled-components';

const GridForm = styled.form`
    max-width: ${(props) => props.maxWidth || '500px'};
    width: 100%;
    display: grid;
    row-gap: 1rem;
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding || '1rem'};
    box-shadow: 0 10px 15px rgba(var(--clr-rgb-black), 0.1);
    text-align: center;
    input,
    select {
        width: 100%;
    }
`;

export default GridForm;
