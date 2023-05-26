import { useState } from 'react';
import { toast } from 'react-toastify';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { useAuthContext } from '../contexts/AuthContext';
import { CustomDatePicker, FormField } from '.';
import { GridForm, Title, Button } from '../styled';

const UpdatePersonalForm = () => {
    const { userData } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState(
        userData?.personal || {
            birthday: '',
            gender: '',
            bio: '',
            location: '',
            job: '',
            website: '',
        }
    );

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
                <label htmlFor='birthday'>Birthday:</label>
                <CustomDatePicker
                    id='birthday'
                    selected={values.birthday}
                    onChange={(d) => setValues({ ...values, birthday: d?.getTime() || '' })}
                    disabled={isLoading}
                />
            </div>
            <FormField
                name='gender'
                value={values.gender}
                onChange={handleChange}
                disabled={isLoading}
            >
                <option value=''>Don't specify</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </FormField>
            <FormField
                as='textarea'
                name='bio'
                value={values.bio}
                onChange={handleChange}
                disabled={isLoading}
                maxLength={100}
                placeholder='Write about yourself'
            />
            <FormField
                name='location'
                value={values.location}
                onChange={handleChange}
                disabled={isLoading}
                placeholder='Specify your location'
            />
            <FormField
                name='job'
                value={values.job}
                onChange={handleChange}
                disabled={isLoading}
                placeholder='Specify your job'
            />
            <FormField
                type='url'
                name='website'
                value={values.website}
                onChange={handleChange}
                disabled={isLoading}
                placeholder='https://example.com'
            />
            <Button type='submit' disabled={isLoading}>
                submit
            </Button>
        </GridForm>
    );
};

export default UpdatePersonalForm;
