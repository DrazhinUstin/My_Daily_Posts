import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaImage, FaTimes } from 'react-icons/fa';
import { doc, collection, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../firebase';
import { usePostContext } from '../contexts/PostContext';
import { Quill } from '.';
import { Substrate, PostEditor as Editor, Button, AlertButton } from '../styled';

const PostEditor = () => {
    const { editablePost, dispatch } = usePostContext();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(editablePost?.message || '');
    const [files, setFiles] = useState([]);

    const handleFile = (e) => {
        const files = [...e.target.files];
        const incorrectTypeFile = files.find((file) => !file.type.startsWith('image/'));
        const incorrectSizeFile = files.find((file) => file.size > 3e6);
        if (files.length > 4) {
            toast.error('You cannot upload more than 4 images.');
        } else if (incorrectTypeFile) {
            toast.error(`Cannot upload ${incorrectTypeFile.name}. Incorrect type.`);
        } else if (incorrectSizeFile) {
            toast.error(`Cannot upload ${incorrectSizeFile.name}. File size > 3 MB `);
        } else setFiles(files);
    };

    const addPost = async () => {
        setIsLoading(true);
        try {
            const docRef = doc(collection(db, 'posts'));
            let imageURLS = [];
            if (files.length) {
                imageURLS = await Promise.all(
                    files.map(async (file, index) => {
                        const storageRef = ref(storage, `posts/${docRef.id}/${index}`);
                        await uploadBytes(storageRef, file);
                        return getDownloadURL(storageRef);
                    })
                );
            }
            await setDoc(docRef, {
                uid: auth.currentUser.uid,
                message,
                imageURLS,
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
            let imageURLS = editablePost.imageURLS;
            if (files.length) {
                const newImageURLS = await Promise.all(
                    files.map(async (file, index) => {
                        const storageRef = ref(storage, `posts/${docRef.id}/${index}`);
                        await uploadBytes(storageRef, file);
                        return getDownloadURL(storageRef);
                    })
                );
                imageURLS = [...newImageURLS, ...imageURLS.slice(newImageURLS.length)];
            }
            await updateDoc(docRef, {
                message,
                imageURLS,
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
                <AlertButton
                    className='close-btn'
                    $icon
                    onClick={() => dispatch({ type: 'CLOSE_EDITOR' })}
                >
                    <FaTimes />
                </AlertButton>
                <Quill value={message} onChange={setMessage} />
                <div className='controls'>
                    <label htmlFor='file'>
                        <FaImage size='2rem' />
                    </label>
                    <input
                        type='file'
                        id='file'
                        accept='image/*'
                        onChange={handleFile}
                        multiple
                        hidden
                    />
                    <Button
                        onClick={editablePost ? editPost : addPost}
                        disabled={!message.length || isLoading}
                    >
                        {editablePost ? 'edit' : 'post'}
                    </Button>
                </div>
                {files.map((file, index) => (
                    <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                        alt='preview'
                    />
                ))}
            </Editor>
        </Substrate>
    );
};

export default PostEditor;
