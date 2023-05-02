import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Auth, RequireAuth, ResetPassword } from './pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route element={<RequireAuth />}>
                        <Route path='/' element={<Home />} />
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
