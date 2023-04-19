import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Modal from "components/Modal";

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({images}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-2 md:grid-cols-3 h-full">
            {/* Big image on the left */}
            <div className="h-80 md:h-full col-span-2 relative">
                <Image
                    src={images[0]}
                    alt="Big Image"
                    fill={true}
                    onClick={handleOpenModal}
                    className="w-full h-full object-cover cursor-pointer"
                />
            </div>
            {/* Small images on the right */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="h-48 relative">
                    <Image
                        src={images[1]}
                        alt={`Image 1`}
                        fill={true}
                        onClick={handleOpenModal}
                        className="w-full h-full object-cover cursor-pointer"
                    />
                </div>
                <div className="h-48 relative">
                    {images.length > 3 ? (
                        <div
                            className="h-48 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer relative"
                            onClick={handleOpenModal}
                        >
                            <Image
                                src={images[2]}
                                alt={`Image 3`}
                                fill={true}
                                onClick={handleOpenModal}
                                className="w-full h-full object-cover blur-sm cursor-pointer"
                            />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <span className="text-white font-medium text-4xl z-10">+{images.length - 3}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 relative">
                            <Image
                                src={images[2]}
                                alt={`Image 3`}
                                fill={true}
                                onClick={handleOpenModal}
                                className="w-full h-full object-cover cursor-pointer"
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} nameModal={"Image Gallery"}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                            <div key={index}>
                                <Image src={image} alt={`Image ${index}`} width={300} height={200}/>
                            </div>
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default ImageGallery;