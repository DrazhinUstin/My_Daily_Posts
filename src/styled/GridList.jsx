import styled from 'styled-components';

const GridList = styled.ul`
    display: grid;
    justify-content: ${(props) => props.justify};
    row-gap: 1rem;
    li {
        display: grid;
        grid-template-columns: ${(props) => props.columns || '10rem auto'};
        align-items: ${(props) => props.align || 'flex-start'};
        font-size: ${(props) => props.fontSize};
        span {
            color: var(--clr-blue);
            font-weight: 500;
        }
    }
`;

export default GridList;
