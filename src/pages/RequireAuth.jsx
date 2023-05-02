import { useAuthContext } from '../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ redirectPath = '/auth', children }) => {
    const { user } = useAuthContext();
    return !user ? <Navigate to={redirectPath} replace={true} /> : children || <Outlet />;
};

export default RequireAuth;
