import LoaderURL from '../assets/loader.svg';
import styled, { css } from 'styled-components';

const Loader = ({ margin, fullscreen, size }) => {
    return (
        <Wrapper margin={margin} fullscreen={fullscreen} size={size}>
            <img src={LoaderURL} alt='loader' />
        </Wrapper>
    );
};

export default Loader;

const Wrapper = styled.div`
    display: grid;
    place-items: center;
    margin: ${(props) => props.margin};
    ${(props) =>
        props.fullscreen &&
        css`
            min-height: calc(100vh - var(--navbar-height) - 8rem);
            margin: 4rem 0;
        `}
    img {
        width: ${(props) => props.size || '10rem'};
        height: ${(props) => props.size || '10rem'};
    }
`;
