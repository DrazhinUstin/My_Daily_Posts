import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GridForm, Title, Input, Button } from '../styled';

const UpdatePersonalForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [values, setValues] = useState({
        gender: '',
        bio: '',
        location: '',
        job: '',
        website: '',
    });

    useEffect(() => {
        setIsLoading(true);
        getDoc(doc(db, `users/${auth.currentUser.uid}`))
            .then((docSnap) => setValues((values) => docSnap.data().personal || values))
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await updateDoc(doc(db, `users/${auth.currentUser.uid}`), { personal: values });
            toast.success('Personal data was updated!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    return (
        <GridForm onSubmit={handleSubmit}>
            <Title>update personal</Title>
            <div>
                <label htmlFor='gender'>Gender:</label>
                <Input
                    as='select'
                    id='gender'
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    <option value=''>Don't specify</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </Input>
            </div>
            <div>
                <label htmlFor='bio'>Bio:</label>
                <Input
                    as='textarea'
                    id='bio'
                    name='bio'
                    value={values.bio}
                    onChange={handleChange}
                    disabled={isLoading}
                    maxLength={100}
                    placeholder='Write about yourself'
                />
            </div>
            <div>
                <label htmlFor='location'>Location:</label>
                <Input
                    id='location'
                    name='location'
                    value={values.location}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder='Specify your location'
                />
            </div>
            <div>
                <label htmlFor='job'>Job:</label>
                <Input
                    id='job'
                    name='job'
                    value={values.job}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder='Specify your job'
                />
            </div>
            <div>
                <label htmlFor='website'>Website:</label>
                <Input
                    type='url'
                    id='website'
                    name='website'
                    value={values.website}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder='https://example.com'
                />
            </div>
            <Button type='submit' disabled={isLoading}>
                submit
            </Button>
        </GridForm>
    );
};

export default UpdatePersonalForm;
