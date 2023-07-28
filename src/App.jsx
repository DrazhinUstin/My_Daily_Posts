import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    SharedLayout,
    Home,
    Users,
    Chats,
    ChatList,
    ChatDetails,
    UserDetails,
    UserPosts,
    UserPersonal,
    UserConnections,
    Settings,
    Account,
    Auth,
    RequireAuth,
    ResetPassword,
    NotFound,
} from './pages';
import {
    UpdateProfileForm,
    UpdateEmailForm,
    UpdatePasswordForm,
    UpdatePersonalForm,
} from './components';
import PostProvider from './contexts/PostContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route element={<SharedLayout />}>
                            <Route path='/' element={<Home />}>
                                <Route
                                    index
                                    element={
                                        <PostProvider>
                                            <UserPosts />
                                        </PostProvider>
                                    }
                                />
                                <Route path='personal' element={<UserPersonal />} />
                                <Route path='connections' element={<UserConnections />} />
                            </Route>
                            <Route path='users' element={<Users />} />
                            <Route path='chats' element={<Chats />}>
                                <Route index element={<ChatList />} />
                                <Route path=':id' element={<ChatDetails />} />
                            </Route>
                            <Route path='user/:uid' element={<UserDetails />}>
                                <Route index element={<UserPosts />} />
                                <Route path='personal' element={<UserPersonal />} />
                                <Route path='connections' element={<UserConnections />} />
                            </Route>
                            <Route path='settings' element={<Settings />}>
                                <Route index element={<Account />} />
                                <Route path='profile' element={<UpdateProfileForm />} />
                                <Route path='email' element={<UpdateEmailForm />} />
                                <Route path='password' element={<UpdatePasswordForm />} />
                                <Route path='personal' element={<UpdatePersonalForm />} />
                            </Route>
                        </Route>
                    </Route>
                    <Route path='auth' element={<Auth />} />
                    <Route path='reset_password' element={<ResetPassword />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Router>
            <ToastContainer position='top-center' closeButton={false} />
        </>
    );
};

export default App;
