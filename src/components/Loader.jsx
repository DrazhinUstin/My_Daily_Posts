import LoaderURL from '../assets/loader.svg';
import styled, { css } from 'styled-components';

const Loader = ({ margin, fullscreen }) => {
    return (
        <Wrapper margin={margin} fullscreen={fullscreen}>
            <img src={LoaderURL} alt='loader' />
        </Wrapper>
    );
};

export default Loader;

const Wrapper = styled.div`
    display: grid;
    place-items: center;
    margin: ${(props) => props.margin || '4rem 0'};
    ${(props) =>
        props.fullscreen &&
        css`
            min-height: calc(100vh - var(--navbar-height) - 8rem);
        `}
`;
