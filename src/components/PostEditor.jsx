import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { FaImage, FaTimes } from 'react-icons/fa';
import { doc, collection, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { usePostContext } from '../contexts/PostContext';
import { Substrate, PostEditor as Editor, Button } from '../styled';

const PostEditor = () => {
    const { editablePost, dispatch } = usePostContext();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(editablePost?.message || '');
    const [file, setFile] = useState(null);

    const handleFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            toast.error(`Incorrect file type: ${file.type}`);
        } else if (file.size > 3e6) {
            toast.error(`File size is too big. Max file size is 3 MB`);
        } else setFile(file);
    };

    const addPost = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(collection(db, 'posts'));
            let imageURL = null;
            if (file) {
                const storageRef = ref(storage, `posts/${docRef.id}`);
                await uploadBytes(storageRef, file);
                imageURL = await getDownloadURL(storageRef);
            }
            await setDoc(docRef, {
                uid: auth.currentUser.uid,
                message,
                imageURL,
                timestamp: serverTimestamp(),
            });
            toast.success('Post was created!');
            dispatch({ type: 'CLOSE_EDITOR' });
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    const editPost = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(db, `posts/${editablePost.id}`);
            let imageURL = editablePost.imageURL;
            if (file) {
                const storageRef = ref(storage, `posts/${docRef.id}`);
                await uploadBytes(storageRef, file);
                imageURL = await getDownloadURL(storageRef);
            }
            await updateDoc(docRef, {
                message,
                imageURL,
            });
            toast.success('Post was edited!');
            dispatch({ type: 'CLOSE_EDITOR' });
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Substrate>
            <Editor>
                <Button
                    className='close-btn'
                    icon
                    onClick={() => dispatch({ type: 'CLOSE_EDITOR' })}
                >
                    <FaTimes />
                </Button>
                <ReactQuill
                    theme='snow'
                    value={message}
                    onChange={setMessage}
                    placeholder='Start writing a post...'
                />
                <div className='controls'>
                    <label htmlFor='file'>
                        <FaImage size='2rem' />
                    </label>
                    <input type='file' id='file' accept='image/*' onChange={handleFile} hidden />
                    <Button
                        onClick={editablePost ? editPost : addPost}
                        disabled={!message.length || isLoading}
                    >
                        {editablePost ? 'edit' : 'post'}
                    </Button>
                </div>
                {file && (
                    <img
                        src={URL.createObjectURL(file)}
                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                        alt='preview'
                    />
                )}
            </Editor>
        </Substrate>
    );
};

export default PostEditor;
