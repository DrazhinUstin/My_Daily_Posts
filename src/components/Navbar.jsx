import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { navbarLinks } from '../utils/localData';
import NavbarMenu from './NavbarMenu';
import Wrapper from '../styled/Navbar';

const Navbar = () => {
    const [areLinksOpen, setAreLinksOpen] = useState(false);
    return (
        <Wrapper>
            <div className='section-center'>
                <button
                    className={areLinksOpen ? 'toggle-links-btn rotate' : 'toggle-links-btn'}
                    onClick={() => setAreLinksOpen(!areLinksOpen)}
                >
                    <FaBars />
                </button>
                <h3 className='logo'>my daily posts</h3>
                <ul className={areLinksOpen ? 'links open' : 'links'}>
                    {navbarLinks.map(({ id, icon, name, path }) => (
                        <li key={id}>
                            <NavLink to={path} onClick={() => setAreLinksOpen(false)}>
                                {icon} {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <NavbarMenu />
            </div>
        </Wrapper>
    );
};

export default Navbar;
