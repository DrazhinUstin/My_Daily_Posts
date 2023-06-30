import { useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Quill = ({ value, onChange }) => {
    const quillRef = useRef(null);

    useEffect(() => {
        quillRef.current.focus();
    }, []);

    return (
        <ReactQuill
            ref={quillRef}
            theme='snow'
            value={value}
            onChange={onChange}
            placeholder='Start writing...'
        />
    );
};

export default Quill;
