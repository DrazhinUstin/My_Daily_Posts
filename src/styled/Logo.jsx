import logoURL from '../assets/logo.svg';
import styled from 'styled-components';

const Logo = styled.img.attrs(() => ({ src: logoURL, alt: 'logo' }))`
    width: 159px;
    height: 48px;
`;

export default Logo;
