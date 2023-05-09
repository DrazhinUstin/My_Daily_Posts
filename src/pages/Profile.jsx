import { UpdateProfileForm, UpdateEmailForm, UpdatePasswordForm } from '../components';

const Profile = () => {
    return (
        <main className='main'>
            <UpdateProfileForm />
            <UpdateEmailForm />
            <UpdatePasswordForm />
        </main>
    );
};

export default Profile;
