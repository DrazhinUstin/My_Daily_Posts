import styled from 'styled-components';
import default_user from '../assets/default_user.svg';

const Avatar = styled.img.attrs((props) => ({ src: props.src || default_user, alt: 'avatar' }))`
    width: ${(props) => props.size || '2.5rem'};
    height: ${(props) => props.size || '2.5rem'};
    margin: ${(props) => props.margin};
    border-radius: 50%;
    object-fit: cover;
`;

export default Avatar;
