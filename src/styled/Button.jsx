import styled, { css } from 'styled-components';

const Button = styled.button.attrs((props) => ({ type: props.type || 'button' }))`
    display: inline-block;
    margin: ${(props) => props.margin};
    padding: 0.5rem;
    border: none;
    border-radius: var(--radius);
    background-color: var(--clr-blue);
    color: var(--clr-white);
    font-family: var(--font-family);
    font-size: 1rem;
    line-height: 1.25;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    ${(props) =>
        props.$flex &&
        css`
            display: inline-flex;
            justify-content: center;
            align-items: center;
            column-gap: 0.5rem;
        `}
    ${(props) =>
        props.$icon &&
        css`
            padding: 0.375rem;
            border-radius: 50%;
            font-size: 0.875rem;
        `}
    ${(props) =>
        props.disabled &&
        css`
            position: relative;
            color: transparent;
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 1rem;
                height: 1rem;
                border: 0.25rem solid var(--clr-white);
                border-right-color: transparent;
                border-radius: 50%;
                animation: rotate 0.5s linear 0s infinite;
                @keyframes rotate {
                    100% {
                        transform: translate(-50%, -50%) rotate(360deg);
                    }
                }
            }
        `}        
    &:hover {
        filter: brightness(120%);
    }
`;

export default Button;

export const GreenButton = styled(Button)`
    background-color: var(--clr-green);
`;

export const AlertButton = styled(Button)`
    background-color: var(--clr-red);
`;
