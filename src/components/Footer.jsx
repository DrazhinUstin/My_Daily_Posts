import { FaGithub } from 'react-icons/fa';
import styled from 'styled-components';

const Footer = () => {
    return (
        <Wrapper>
            <p>
                {new Date().getFullYear()} &copy; My Daily Posts |
                <a
                    href='https://github.com/DrazhinUstin/My_Daily_Posts'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <FaGithub />
                </a>
            </p>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.footer`
    height: var(--footer-height);
    display: grid;
    place-items: center;
    border-top: 1px solid var(--clr-light-blue-2);
    p {
        display: flex;
        align-items: center;
        column-gap: 0.375rem;
        font-size: 0.75rem;
        svg {
            color: var(--clr-black);
            font-size: 1rem;
        }
    }
`;
