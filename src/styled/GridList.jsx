import styled, { css } from 'styled-components';

const GridList = styled.ul`
    display: grid;
    row-gap: 1rem;
    ${(props) =>
        props.center &&
        css`
            justify-content: center;
        `}
    li {
        display: grid;
        grid-template-columns: ${(props) => props.columns || '10rem auto'};
        align-items: center;
        font-size: ${(props) => props.fontSize};
        span {
            color: var(--clr-blue);
            font-weight: 500;
        }
    }
`;

export default GridList;
