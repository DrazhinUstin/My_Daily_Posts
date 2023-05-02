import styled from 'styled-components';

const Title = styled.h2`
    margin: ${(props) => props.margin};
    text-align: ${(props) => props.textAlign || 'center'};
    font-size: ${(props) => props.fontSize};
`;

export default Title;
