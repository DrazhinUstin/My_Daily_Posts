import {
    FaHome,
    FaUsers,
    FaComments,
    FaCog,
    FaUser,
    FaEnvelope,
    FaShieldAlt,
    FaPenAlt,
} from 'react-icons/fa';

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
        icon: <FaComments />,
        name: 'chats',
        path: '/chats',
    },
];

export const settingsLinks = [
    {
        id: 1,
        icon: <FaCog />,
        name: 'account',
        path: '.',
    },
    {
        id: 2,
        icon: <FaUser />,
        name: 'profile',
        path: 'profile',
    },
    {
        id: 3,
        icon: <FaEnvelope />,
        name: 'email',
        path: 'email',
    },
    {
        id: 4,
        icon: <FaShieldAlt />,
        name: 'password',
        path: 'password',
    },
    {
        id: 5,
        icon: <FaPenAlt />,
        name: 'personal',
        path: 'personal',
    },
];
