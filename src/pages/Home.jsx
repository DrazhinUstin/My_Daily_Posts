import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Loader, ProfileHeader, UserLinks } from '../components';

const Home = () => {
    const { userData } = useAuthContext();

    if (!userData) return <Loader fullscreen />;

    return (
        <main className='main'>
            <ProfileHeader {...userData} />
            <UserLinks />
            <Outlet context={userData} />
        </main>
    );
};

export default Home;
