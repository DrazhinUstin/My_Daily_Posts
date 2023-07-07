import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {
    doc,
    updateDoc,
    getDocs,
    query,
    collectionGroup,
    where,
    writeBatch,
} from 'firebase/firestore';
import { auth, storage, db } from '../firebase';
import { FormField } from '.';
import { GridForm, Title, Button, GreenButton } from '../styled';

const UpdateProfileForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({ displayName: auth.currentUser.displayName, file: null });

    const handleChange = (e) => {
        let { name, value } = e.target;
        if (name === 'file') {
            value = e.target.files[0];
            if (!value) {
                setValues({ ...values, [name]: null });
                return;
            }
            if (!value.type.startsWith('image/')) {
                toast.error(`Incorrect file type: ${value.type}`);
                return;
            }
            if (value.size > 3e6) {
                toast.error(`File is too big. Max file size is 3 MB`);
                return;
            }
        }
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let photoURL = auth.currentUser.photoURL;
            if (values.file) {
                const storageRef = ref(storage, `users/${auth.currentUser.uid}`);
                await uploadBytes(storageRef, values.file);
                photoURL = await getDownloadURL(storageRef);
            }
            await updateProfile(auth.currentUser, {
                displayName: values.displayName,
                photoURL,
            });
            await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
                displayName: values.displayName,
                photoURL,
            });
            const { docs } = await getDocs(
                query(collectionGroup(db, 'comments'), where('uid', '==', auth.currentUser.uid))
            );
            const chunks = [];
            for (let i = 0; i < docs.length; i += 500) {
                chunks.push(docs.slice(i, i + 500));
            }
            await Promise.all(
                chunks.map((chunk) => {
                    const batch = writeBatch(db);
                    chunk.forEach((doc) =>
                        batch.update(doc.ref, { displayName: values.displayName, photoURL })
                    );
                    return batch.commit();
                })
            );
            setValues({ ...values, file: null });
            toast.success('Profile was updated!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <GridForm onSubmit={handleSubmit}>
            <Title>update profile</Title>
            <FormField
                name='displayName'
                value={values.displayName}
                onChange={handleChange}
                disabled={isLoading}
                required
                labelText='Username:'
            />
            <GreenButton onClick={(e) => e.target.nextElementSibling.click()} disabled={isLoading}>
                change avatar
            </GreenButton>
            <input type='file' name='file' accept='image/*' onChange={handleChange} hidden />
            {values.file && (
                <img
                    src={URL.createObjectURL(values.file)}
                    onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                    alt='preview'
                    style={{ width: '5rem' }}
                />
            )}
            <Button type='submit' disabled={isLoading}>
                submit
            </Button>
        </GridForm>
    );
};

export default UpdateProfileForm;
