import { auth } from '../firebase';
import { formatTimestamp } from '../utils/helpers';
import { Title, GridList, Avatar } from '../styled';

const Account = () => {
    const {
        displayName,
        email,
        photoURL,
        metadata: { creationTime, lastSignInTime },
    } = auth.currentUser;
    return (
        <section>
            <Title margin='0 0 2rem'>account details</Title>
            <GridList align='center'>
                <li>
                    Avatar: <Avatar src={photoURL} />
                </li>
                <li>
                    Username: <span>{displayName}</span>
                </li>
                <li>
                    Email: <span>{email}</span>
                </li>
                <li>
                    Created at: <span>{formatTimestamp(creationTime)}</span>
                </li>
                <li>
                    Last sign in at: <span>{formatTimestamp(lastSignInTime)}</span>
                </li>
            </GridList>
        </section>
    );
};

export default Account;
