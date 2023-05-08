import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCog, FaDoorOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';
import default_user from '../assets/default_user.svg';

const NavbarMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuthContext();

    const exit = () => signOut(auth).catch((error) => toast.error(error.message));

    return (
        <div className='user'>
            <img
                src={user?.photoURL || default_user}
                alt='avatar'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
            {isMenuOpen && (
                <ul className='user-menu' onClick={() => setIsMenuOpen(false)}>
                    <li>
                        <Link to='/profile'>
                            <FaUserCog />
                            profile
                        </Link>
                    </li>
                    <li>
                        <button onClick={exit}>
                            <FaDoorOpen />
                            sign out
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default NavbarMenu;
