import styled from 'styled-components';

const Title = styled.h2`
    margin: ${(props) => props.margin};
    text-align: ${(props) => props.textAlign || 'center'};
    font-size: ${(props) => props.fontSize};
    text-transform: capitalize;
    letter-spacing: ${(props) => props.letterSpacing || 'var(--spacing)'};
`;

export default Title;
