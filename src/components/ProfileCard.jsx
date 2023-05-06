import { useAuthContext } from '../contexts/AuthContext';
import default_user from '../assets/default_user.svg';

const ProfileCard = () => {
    const { user } = useAuthContext();
    return (
        <article>
            <img src={user?.photoURL || default_user} alt='avatar' />
            <h2>{user.displayName}</h2>
            <p>{user.email}</p>
        </article>
    );
};

export default ProfileCard;
