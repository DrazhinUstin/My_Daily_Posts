import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { FormField } from '.';
import { GridForm, Title, TextButton, Button } from '../styled';

const UpdateEmailForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const { email, password } = Object.fromEntries(formData);
            const credential = EmailAuthProvider.credential(auth.currentUser.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updateEmail(auth.currentUser, email);
            toast.success('Email updated!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <GridForm onSubmit={handleSubmit}>
            <Title>update email</Title>
            <FormField
                type='email'
                name='email'
                defaultValue={auth.currentUser.email}
                disabled={isLoading}
                required
            />
            <FormField type='password' name='password' disabled={isLoading} required />
            <p>
                <TextButton as={Link} to='/reset_password'>
                    forgot password?
                </TextButton>
            </p>
            <Button type='submit' disabled={isLoading}>
                submit
            </Button>
        </GridForm>
    );
};

export default UpdateEmailForm;
