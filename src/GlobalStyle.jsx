import { createGlobalStyle } from 'styled-components';

export const breakpoints = {
    lg: '(max-width: 1200px)',
    md: '(max-width: 1024px)',
    sm: '(max-width: 768px)',
    xsm: '(max-width: 425px)',
};

const GlobalStyle = createGlobalStyle`
    :root {
        --clr-black: #000;
        --clr-rgb-black: 0, 0, 0;
        --clr-white: #fff;
        --clr-rgb-white: 255, 255, 255;
        --clr-gray: #ccc;
        --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        --spacing: 0.1rem;
        --max-content-width: 1200px;
        --radius: 0.25rem; 
        --trans-ease: all 0.4s ease;
        --toastify-font-family: var(--font-family);   
    }

    *,
    ::after,
    ::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        background-color: var(--clr-white);
        color: var(--clr-black);
        font-family: var(--font-family);
        font-size: 1rem;
        line-height: 1.5;
        overflow-wrap: anywhere;
    }

    h1,
    h2,
    h3,
    h4 {
        text-transform: capitalize;
        letter-spacing: var(--spacing);
    }

    h1 {
        font-size: 2rem;
        line-height: 1.25;
    }

    h2 {
        font-size: 1.5rem;
        line-height: 1.25;
    }

    h3 {
        font-size: 1.25rem;
    }

    h4 {
        font-size: 1rem;
    }

    li {
        list-style-type: none;
    }

    a {
        text-decoration: none;
    }

    img,
    svg {
        display: block;
    }

    input,
    select {
        &:disabled {
            cursor: not-allowed;
        }
    }

    button {
        cursor: pointer;
        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
    }

    .main {
        max-width: var(--max-content-width);
        width: 90vw;
        margin: 4rem auto;
    }

    .grid-center {
        display: grid;
        place-items: center;
    }

    .text-center {
        text-align: center;
    }
`;

export default GlobalStyle;
