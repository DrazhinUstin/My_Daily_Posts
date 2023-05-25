import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { ProfileHeader, UserLinks } from '../components';

const Home = () => {
    const { userData } = useAuthContext();

    if (!userData) return <h2 className='text-center'>loading...</h2>;

    return (
        <main className='main'>
            <ProfileHeader {...userData} />
            <UserLinks />
            <Outlet context={userData} />
        </main>
    );
};

export default Home;
