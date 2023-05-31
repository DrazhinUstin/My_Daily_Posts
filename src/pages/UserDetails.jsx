import { useState, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Loader, ProfileHeader, UserLinks } from '../components';

const UserDetails = () => {
    const { uid } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            doc(db, `users/${uid}`),
            (doc) => setUserData(doc.data()),
            (error) => toast.error(error.message)
        );
        return () => unsubscribe();
    }, [uid]);

    if (!userData) return <Loader fullscreen />;

    return (
        <main className='main'>
            <ProfileHeader {...userData} />
            <UserLinks />
            <Outlet context={userData} />
        </main>
    );
};

export default UserDetails;
