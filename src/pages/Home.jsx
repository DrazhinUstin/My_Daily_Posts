import { usePostContext } from '../contexts/PostContext';
import { ProfileCard, CreatePost, Posts, PostEditor } from '../components';

const Home = () => {
    const { posts, isEditorOpen } = usePostContext();
    return (
        <main className='main'>
            <ProfileCard />
            <CreatePost />
            <Posts posts={posts} />
            {isEditorOpen && <PostEditor />}
        </main>
    );
};

export default Home;
