import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components';

const SharedLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};

export default SharedLayout;
