import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { GridForm, Title, Input, Button, TextButton } from '../styled';
import { toast } from 'react-toastify';

const AuthForm = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({
        displayName: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { displayName, email, password } = values;
            if (isSignInForm) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, { displayName });
                await setDoc(doc(db, 'users', user.uid), { displayName });
                navigate('/', { replace: true });
            }
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    return (
        <GridForm onSubmit={handleSubmit}>
            <Title>{isSignInForm ? 'sign in' : 'sign up'}</Title>
            {!isSignInForm && (
                <Input
                    name='displayName'
                    value={values.displayName}
                    onChange={handleChange}
                    disabled={isLoading}
                    placeholder='Username'
                    required
                />
            )}
            <Input
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                disabled={isLoading}
                placeholder='Email'
                required
            />
            <Input
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                disabled={isLoading}
                placeholder='Password'
                required
            />
            {isSignInForm && (
                <p>
                    <TextButton as={Link} to='/reset_password'>
                        forgot password?
                    </TextButton>
                </p>
            )}
            <Button type='submit' disabled={isLoading}>
                {isSignInForm ? 'sign in' : 'sign up'}
            </Button>
            <p>
                {isSignInForm ? "Don't have an account? " : 'Already have an account? '}
                <TextButton onClick={() => setIsSignInForm(!isSignInForm)}>
                    {isSignInForm ? 'sign up' : 'sign in'}
                </TextButton>
            </p>
        </GridForm>
    );
};

export default AuthForm;
