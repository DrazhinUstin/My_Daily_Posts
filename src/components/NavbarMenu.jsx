import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCog, FaDoorOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';
import { Avatar } from '../styled';

const NavbarMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuthContext();

    const exit = () => signOut(auth).catch((error) => toast.error(error.message));

    return (
        <div className='user'>
            <Avatar src={user?.photoURL} size='2rem' onClick={() => setIsMenuOpen(!isMenuOpen)} />
            {isMenuOpen && (
                <ul className='user-menu' onClick={() => setIsMenuOpen(false)}>
                    <li>
                        <Link to='/settings'>
                            <FaUserCog />
                            settings
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
