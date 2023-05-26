import { useState } from 'react';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Button, AlertButton } from '../styled';

const ConnectionBtn = ({ uid, connections }) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleConnection = async () => {
        setIsLoading(true);
        try {
            if (!isConnectionExist) {
                await updateDoc(doc(db, `users/${uid}`), {
                    connections: arrayUnion(auth.currentUser.uid),
                });
                await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
                    connections: arrayUnion(uid),
                });
                toast.success('Connection added!');
            } else {
                await updateDoc(doc(db, `users/${uid}`), {
                    connections: arrayRemove(auth.currentUser.uid),
                });
                await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
                    connections: arrayRemove(uid),
                });
                toast.success('Connection removed!');
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const isConnectionExist = connections?.includes(auth.currentUser.uid);
    return !isConnectionExist ? (
        <Button onClick={toggleConnection} disabled={isLoading} $flex>
            <FaUserPlus /> connect
        </Button>
    ) : (
        <AlertButton onClick={toggleConnection} disabled={isLoading} $flex>
            <FaUserMinus /> disconnect
        </AlertButton>
    );
};

export default ConnectionBtn;
