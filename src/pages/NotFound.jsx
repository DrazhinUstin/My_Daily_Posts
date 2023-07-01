import { Link } from 'react-router-dom';
import { Logo, Button } from '../styled';
import { breakpoints } from '../GlobalStyle';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <main className='main-100 grid-center'>
            <Wrapper>
                <Logo />
                <div className='columns'>
                    <h1>404</h1>
                    <div className='separator'></div>
                    <div>
                        <h3>page not found</h3>
                        <p>Sorry, the page you are looking for doesn't exist...</p>
                    </div>
                </div>
                <Button as={Link} to='/'>
                    back home
                </Button>
            </Wrapper>
        </main>
    );
};

export default NotFound;

const Wrapper = styled.article.attrs({ className: 'content-card' })`
    text-align: center;
    ${Logo} {
        margin: 0 auto;
    }
    .columns {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
        h1 {
            font-size: 5rem;
            line-height: 1;
        }
        .separator {
            width: 4px;
            height: 4rem;
            border-radius: var(--radius);
            background-color: var(--clr-red);
        }
        h3 {
            margin-bottom: 0.5rem;
        }
        @media ${breakpoints.sm} {
            grid-template-columns: unset;
            .separator {
                width: 4rem;
                height: 4px;
                margin: 0 auto;
            }
        }
    }
`;
