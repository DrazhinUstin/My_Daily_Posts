import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import AuthForm from '../components/AuthForm';

const Auth = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.displayName) navigate('/', { replace: true });
    }, [user]);

    return (
        <main className='main-100 grid-center'>
            <AuthForm />
        </main>
    );
};

export default Auth;
