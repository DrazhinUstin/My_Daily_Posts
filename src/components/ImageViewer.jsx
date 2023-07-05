import { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Substrate, Button } from '../styled';
import styled from 'styled-components';

const ImageViewer = ({ urls = [], initialIndex = 0, closeViewer }) => {
    const [index, setIndex] = useState(initialIndex);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <Wrapper>
            <p className='counter'>
                {index + 1} of {urls.length}
            </p>
            <Button $icon className='close-btn' onClick={closeViewer}>
                <FaTimes />
            </Button>
            <img src={urls[index]} alt='selected_image' />
            {urls.length > 1 && (
                <>
                    {index > 0 && (
                        <Button $icon className='arrow' onClick={() => setIndex(index - 1)}>
                            <FaChevronLeft />
                        </Button>
                    )}
                    {index < urls.length - 1 && (
                        <Button $icon className='arrow next' onClick={() => setIndex(index + 1)}>
                            <FaChevronRight />
                        </Button>
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default ImageViewer;

const Wrapper = styled(Substrate)`
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        max-width: 100%;
        max-height: 100%;
    }
    button {
        background-color: rgba(var(--clr-rgb-white), 0.8);
        color: var(--clr-black);
    }
    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
    }
    .arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 1rem;
        &.next {
            left: unset;
            right: 1rem;
        }
    }
    .counter {
        position: absolute;
        top: 1rem;
        left: 1rem;
        color: var(--clr-white);
    }
`;
