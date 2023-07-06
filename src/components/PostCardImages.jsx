import { useState } from 'react';
import { ImageViewer } from '.';

const PostCardImages = ({ imageURLS }) => {
    const [viewerConfig, setViewerConfig] = useState({ isOpen: false, index: null });
    return (
        <>
            <div className='images'>
                {imageURLS.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt='post_image'
                        onClick={() => setViewerConfig({ isOpen: true, index })}
                    />
                ))}
            </div>
            {viewerConfig.isOpen && (
                <ImageViewer
                    urls={imageURLS}
                    initialIndex={viewerConfig.index}
                    closeViewer={() => setViewerConfig({ isOpen: false, index: null })}
                />
            )}
        </>
    );
};

export default PostCardImages;
