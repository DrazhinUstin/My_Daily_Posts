import { FaHome, FaUsers, FaNewspaper } from 'react-icons/fa';

export const navbarLinks = [
    {
        id: 1,
        icon: <FaHome />,
        name: 'home',
        path: '/',
    },
    {
        id: 2,
        icon: <FaUsers />,
        name: 'users',
        path: '/users',
    },
    {
        id: 3,
        icon: <FaNewspaper />,
        name: 'feed',
        path: '/feed',
    },
];
