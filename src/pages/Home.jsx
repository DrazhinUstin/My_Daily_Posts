import { useAuthContext } from '../contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Home = () => {
    const { user } = useAuthContext();
    return (
        <main>
            <h2>{user.displayName}</h2>
            <h4>{user.email}</h4>
            <button onClick={() => signOut(auth)}>sign out</button>
        </main>
    );
};

export default Home;
