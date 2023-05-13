import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Home,
    Users,
    UserDetails,
    Settings,
    Account,
    Auth,
    RequireAuth,
    ResetPassword,
} from './pages';
import { Navbar, UpdateProfileForm, UpdateEmailForm, UpdatePasswordForm } from './components';
import PostProvider from './contexts/PostContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <Router>
                <Navbar />
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route
                            path='/'
                            element={
                                <PostProvider>
                                    <Home />
                                </PostProvider>
                            }
                        />
                        <Route path='users' element={<Users />} />
                        <Route path='user/:uid' element={<UserDetails />} />
                        <Route path='settings' element={<Settings />}>
                            <Route index element={<Account />} />
                            <Route path='profile' element={<UpdateProfileForm />} />
                            <Route path='email' element={<UpdateEmailForm />} />
                            <Route path='password' element={<UpdatePasswordForm />} />
                        </Route>
                    </Route>
                    <Route path='auth' element={<Auth />} />
                    <Route path='reset_password' element={<ResetPassword />} />
                </Routes>
            </Router>
            <ToastContainer position='top-center' />
        </>
    );
};

export default App;
