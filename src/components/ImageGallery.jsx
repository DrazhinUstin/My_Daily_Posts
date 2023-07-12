import { useState } from 'react';
import { ImageViewer } from '.';

const ImageGallery = ({ urls, className }) => {
    const [viewerConfig, setViewerConfig] = useState({ isOpen: false });
    return (
        <>
            <div className={className}>
                {urls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt='gallery-image'
                        onClick={() => setViewerConfig({ isOpen: true, index })}
                    />
                ))}
            </div>
            {viewerConfig.isOpen && (
                <ImageViewer
                    urls={urls}
                    initialIndex={viewerConfig.index}
                    closeViewer={() => setViewerConfig({ isOpen: false })}
                />
            )}
        </>
    );
};

export default ImageGallery;
