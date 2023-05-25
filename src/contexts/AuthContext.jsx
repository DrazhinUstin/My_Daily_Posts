import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { onSnapshot, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) {
            setUserData(null);
            return;
        }
        const unsubscribe = onSnapshot(
            doc(db, `users/${user.uid}`),
            (doc) => setUserData(doc.data()),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [user]);

    return <AuthContext.Provider value={{ user, userData }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
