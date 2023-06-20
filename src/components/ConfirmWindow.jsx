import { useState } from 'react';
import { Substrate, Button, AlertButton } from '../styled';
import styled from 'styled-components';

const ConfirmWindow = ({ message, callback, closeWindow }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        await callback();
        closeWindow();
    };

    return (
        <Substrate>
            <Window>
                <p>{message || 'Are you sure that you want to perform this action?'}</p>
                <div className='btns'>
                    <Button onClick={handleClick} disabled={isLoading}>
                        confirm
                    </Button>
                    <AlertButton onClick={closeWindow} disabled={isLoading}>
                        cancel
                    </AlertButton>
                </div>
            </Window>
        </Substrate>
    );
};

export default ConfirmWindow;

const Window = styled.article`
    max-width: 90vw;
    padding: 1rem;
    border-radius: var(--radius);
    background-color: var(--clr-white);
    text-align: center;
    .btns {
        display: flex;
        justify-content: center;
        column-gap: 1rem;
        margin-top: 1rem;
    }
`;
