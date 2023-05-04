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
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} nameModal={"Image Gallery"}>

                <Carousel slice={images} auto={false} preview={true}>
                    <ImageModalCarousel/>
                </Carousel>
        </Modal>
    )

    if (images.length == 0) {
        return (
            <div className={"text-2xl text-center font-bold"}>
                NO images 😭😭😭
            </div>
        )
    }

    if (images.length == 1) {
        return (
            <div className={'relative h-80 md:h-[25rem] w-full md:mr-5'}>
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
    }


    return (
        <div>
            <Carousel slice={images} auto={true}>
                <ImageCarousel onClick={handleOpenModal}/>
            </Carousel>
            {modal}
        </div>

    )
}

export default ImageGallery;