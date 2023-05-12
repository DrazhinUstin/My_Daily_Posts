import { FaTimesCircle } from 'react-icons/fa';
import { GridForm, Title, Input, Button } from '../styled';

const UserSearchForm = ({ isLoading, search, setSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { search } = Object.fromEntries(new FormData(e.currentTarget));
        setSearch(search);
    };
    return (
        <GridForm margin='0 auto 4rem' onSubmit={handleSubmit}>
            <Title>search a user</Title>
            <Input name='search' placeholder='Enter username' disabled={isLoading} required />
            {search && (
                <div>
                    <Button onClick={() => setSearch('')} flex style={{ textTransform: 'unset' }}>
                        {search} <FaTimesCircle />
                    </Button>
                </div>
            )}
        </GridForm>
    );
};

export default UserSearchForm;
