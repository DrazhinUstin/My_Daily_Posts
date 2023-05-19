import { useState } from 'react';
import { FaUserPlus, FaUserMinus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Button } from '../styled';

const ConnectionBtn = ({ uid, connections }) => {
    const [isLoading, setIsLoading] = useState(false);

    const toggleConnection = async () => {
        setIsLoading(true);
        try {
            if (!isConnectionExist) {
                await updateDoc(doc(db, `users/${uid}`), {
                    connections: arrayUnion(auth.currentUser.uid),
                });
                toast.success('Connection added!');
            } else {
                await updateDoc(doc(db, `users/${uid}`), {
                    connections: arrayRemove(auth.currentUser.uid),
                });
                toast.success('Connection removed!');
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const isConnectionExist = connections?.includes(auth.currentUser.uid);
    return (
        <Button onClick={toggleConnection} disabled={isLoading} flex>
            {!isConnectionExist ? (
                <>
                    <FaUserPlus /> connect
                </>
            ) : (
                <>
                    <FaUserMinus /> disconnect
                </>
            )}
        </Button>
    );
};

export default ConnectionBtn;