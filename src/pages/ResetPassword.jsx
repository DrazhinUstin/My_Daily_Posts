import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { GridForm, Title, Input, Button, TextButton } from '../styled';

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { email } = Object.fromEntries(new FormData(e.currentTarget));
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent!');
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <main className='main-100 grid-center'>
            <GridForm onSubmit={handleSubmit}>
                <Title>Forgot Your Password?</Title>
                <p>
                    Enter your email address and we will send you instructions to reset your
                    password.
                </p>
                <Input
                    type='email'
                    name='email'
                    placeholder='Email address'
                    disabled={isLoading}
                    required
                />
                <Button type='submit' disabled={isLoading}>
                    continue
                </Button>
                <p>
                    Back to{' '}
                    <TextButton as={Link} to='/'>
                        my daily posts
                    </TextButton>
                </p>
            </GridForm>
        </main>
    );
};

export default ResetPassword;
