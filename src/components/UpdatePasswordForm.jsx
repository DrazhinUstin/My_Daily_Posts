import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { GridForm, Title, Input, TextButton, Button } from '../styled';

const UpdatePasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const formData = new FormData(e.currentTarget);
            const { old_password, new_password } = Object.fromEntries(formData);
            const credential = EmailAuthProvider.credential(auth.currentUser.email, old_password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, new_password);
            toast.success('Password updated!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <GridForm onSubmit={handleSubmit}>
            <Title>update password</Title>
            <Input
                type='password'
                name='old_password'
                placeholder='Old password'
                disabled={isLoading}
                required
            />
            <Input
                type='password'
                name='new_password'
                placeholder='New password'
                disabled={isLoading}
                required
            />
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

export default UpdatePasswordForm;
