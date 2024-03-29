import { createGlobalStyle } from 'styled-components';

export const breakpoints = {
    lg: '(max-width: 1200px)',
    md: '(max-width: 1024px)',
    sm: '(max-width: 768px)',
    xsm: '(max-width: 425px)',
};

const GlobalStyle = createGlobalStyle`
    :root {
        --clr-black: #3c434c;
        --clr-rgb-black: 60, 67, 76;
        --clr-white: #fff;
        --clr-rgb-white: 255, 255, 255;
        --clr-light-gray: #ebebeb;
        --clr-gray: #ccc;
        --clr-dark-gray: #9e9e9e;
        --clr-light-blue: #f0f5ff;
        --clr-light-blue-2: #dce5ff;
        --clr-blue: #4169e1;
        --clr-red: #dd3535;
        --clr-green: #2da715;
        --main-shadow: 0 5px 10px rgba(17, 61, 149, 0.2);
        --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
            'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        --spacing: 0.1rem;
        --max-content-width: 1200px;
        --navbar-height: 3.5rem;
        --footer-height: 2rem;
        --main-margin-y: 4rem;
        --main-fullscreen: calc(100vh - var(--navbar-height) - var(--footer-height) - var(--main-margin-y) * 2);
        --main-100-fullscreen: calc(100vh - var(--main-margin-y) * 2);
        --radius: 0.25rem; 
        --trans-ease: all 0.4s ease;
        --toastify-color-light: var(--clr-white);
        --toastify-color-success: var(--clr-green);
        --toastify-color-error: var(--clr-red);
        --toastify-text-color-light: var(--clr-black);   
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
        background-color: var(--clr-light-blue);
        color: var(--clr-black);
        font-family: var(--font-family);
        font-size: 1rem;
        line-height: 1.5;
        overflow-wrap: anywhere;
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
    select, 
    textarea {
        &:disabled {
            opacity: 0.7;
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
        min-height: var(--main-fullscreen);
        max-width: var(--max-content-width);
        width: 90vw;
        margin: var(--main-margin-y) auto;
    }

    .main-100 {
        min-height: var(--main-100-fullscreen);
        max-width: var(--max-content-width);
        width: 90vw;
        margin: var(--main-margin-y) auto;
    }

    .section-center {
        max-width: var(--max-content-width);
        width: 90vw;
        margin: auto;
    }

    .grid-center {
        display: grid;
        place-items: center;
    }

    .text-center {
        text-align: center;
    }

    .italic {
        font-style: italic;
    }

    .content-card {
        max-width: 600px;
        width: 100%;
        padding: 1rem;
        border-radius: var(--radius);
        box-shadow: var(--main-shadow);
        background-color: var(--clr-white);
    }

    .quill {
        .ql-toolbar.ql-snow {
            border-color: var(--clr-gray);
            font-family: var(--font-family);
        }
        .ql-container.ql-snow {
            border-color: var(--clr-gray);
        }
        .ql-container {
            font-family: var(--font-family);
            font-size: 0.875rem;
        }
        .ql-editor {
            line-height: 1.5;
        }
        .ql-snow a {
            color: var(--clr-blue);  
        }
        .ql-snow .ql-tooltip {
            border-color: var(--clr-gray);
            box-shadow: var(--main-shadow);
            background-color: var(--clr-white);
            color: var(--clr-black);
        }
    }

    .Toastify__toast {
        box-shadow: var(--main-shadow);
    }
`;

export default GlobalStyle;
