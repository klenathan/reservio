import React, {useState} from 'react';
import Image from 'next/image';
import Modal from "components/Modal";
import Carousel from "components/Carousel";
import ImageModalCarousel from "components/Detail/ImageGallery/ImageModalCarousel";
import ImageCarousel from "components/Detail/ImageGallery/ImageCarousel";

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

    const modal = isModalOpen && (
        // TODO Create the new modal of viewing gallery
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} nameModal={"Image Gallery"}>
            <div>
                <Carousel slice={images} auto={false} preview={true}>
                    <ImageModalCarousel/>
                </Carousel>
            </div>
        </Modal>
    )


    if (images.length == 0) {
        return (
            <div>
                NO images 😭😭😭
            </div>
        )
    }

    if (images.length == 1) {
        return (
            <div className={'relative w-full h-80'}>
                <Image
                    src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + images[0]}
                    alt="Image"
                    fill={true}
                    onClick={handleOpenModal}
                    className="object-cover cursor-pointer rounded-lg"
                    loading="lazy"
                />
                {modal}
            </div>
        )
    } else if (images.length == 2) {
        return (
            <div>
                <Carousel slice={images} auto={true}>
                    <ImageCarousel onClick={handleOpenModal}/>
                </Carousel>
                {modal}
            </div>

        )
    }

    return (
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 gap-2 md:grid-cols-3 h-full">
            {/* Big image on the left */}
            <div className="h-80 md:h-full col-span-2 relative">
                <Image
                    src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + images[0]}
                    alt={'Big Image'}
                    fill={true}
                    onClick={handleOpenModal}
                    className="w-full h-full object-cover cursor-pointer"
                    loading="lazy"
                />
            </div>
            {/* Small images on the right */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
                <div className="h-48 relative">
                    <Image
                        src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + images[1]}
                        alt={`Image 1`}
                        fill={true}
                        onClick={handleOpenModal}
                        className="w-full h-full object-cover cursor-pointer"
                        loading="lazy"
                    />
                </div>
                <div className="h-48 relative">
                    {images.length > 3 ? (
                        <div
                            className="h-48 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer relative"
                            onClick={handleOpenModal}
                        >
                            <Image
                                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + images[2]}
                                alt={`Image 3`}
                                fill={true}
                                onClick={handleOpenModal}
                                className="w-full h-full object-cover blur-sm cursor-pointer"
                                loading="lazy"
                            />
                            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <span className="text-white font-medium text-4xl z-10">+{images.length - 3}</span>
                            </div>
                        </div>
                    ) : (
                        <div className="h-48 relative">
                            <Image
                                src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + images[2]}
                                alt={`Image 3`}
                                fill={true}
                                onClick={handleOpenModal}
                                className="w-full h-full object-cover cursor-pointer"
                                loading="lazy"
                            />
                        </div>
                    )}
                </div>
            </div>
            {/* Modal */}
            {modal}
        </div>
    );
};

export default ImageGallery;