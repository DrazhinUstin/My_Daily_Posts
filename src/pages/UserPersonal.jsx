import { useOutletContext } from 'react-router-dom';
import { FaBook, FaTransgender, FaMapMarkerAlt, FaBriefcase, FaGlobe } from 'react-icons/fa';
import { GridList } from '../styled';
import styled from 'styled-components';

const UserPersonal = () => {
    const {
        userData: { personal },
    } = useOutletContext();
    return (
        <Wrapper>
            <GridList columns='7rem auto'>
                <li>
                    <span className='flex'>
                        <FaBook />
                        Bio:
                    </span>
                    {personal?.bio || <em>not specified</em>}
                </li>
                <li>
                    <span className='flex'>
                        <FaTransgender />
                        Gender:
                    </span>
                    {personal?.gender || <em>not specified</em>}
                </li>
                <li>
                    <span className='flex'>
                        <FaMapMarkerAlt />
                        Location:
                    </span>
                    {personal?.location || <em>not specified</em>}
                </li>
                <li>
                    <span className='flex'>
                        <FaBriefcase />
                        Job:
                    </span>
                    {personal?.job || <em>not specified</em>}
                </li>
                <li>
                    <span className='flex'>
                        <FaGlobe />
                        Website:
                    </span>
                    {personal?.website ? (
                        <a href={personal.website} target='_blank' rel='noopener noreferrer'>
                            {personal.website}
                        </a>
                    ) : (
                        <em>not specified</em>
                    )}
                </li>
            </GridList>
        </Wrapper>
    );
};

export default UserPersonal;

const Wrapper = styled.section`
    max-width: 600px;
    padding: 1rem;
    box-shadow: 0 10px 15px rgba(var(--clr-rgb-black), 0.1);
    .flex {
        display: flex;
        align-items: center;
        column-gap: 0.25rem;
        svg {
            flex-shrink: 0;
        }
    }
    a {
        color: var(--clr-blue);
        &:hover {
            text-decoration: underline;
        }
    }
`;
