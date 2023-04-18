import React, {useState} from "react";
import Modal from "components/Modal";

interface Image {
  src: string;
  width: number;
  height: number;
}

interface ImageGalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const imageCount = images.length;
  const hasModal = imageCount > 3;

  // Calculate the aspect ratio of the first three images
  const aspectRatios = images.slice(0, 3).map((image) => image.width / image.height);
  const totalAspectRatio = aspectRatios.reduce((sum, ratio) => sum + ratio, 0);
  const column1AspectRatio = aspectRatios[0] / totalAspectRatio;
  const column2AspectRatio = aspectRatios[1] / totalAspectRatio;

  return (
    <div className="relative">
      <div className="flex flex-wrap">
        {/* First column */}
        <div className={`w-full md:w-${column1AspectRatio * 100}% h-64 md:h-auto bg-gray-300 rounded-lg overflow-hidden mb-4 md:mb-0 md:mr-4`}>
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${images[0].src})` }}></div>
        </div>
        {/* Second column */}
        <div className={`w-full md:w-${column2AspectRatio * 100}% h-64 md:h-auto bg-gray-300 rounded-lg overflow-hidden mb-4 md:mb-0`}>
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${images[1].src})` }}></div>
        </div>
        {/* Third column */}
        <div className={`w-full md:w-${(1 - column1AspectRatio - column2AspectRatio) * 100}% h-64 md:h-auto bg-gray-300 rounded-lg overflow-hidden mb-4 md:ml-4`}>
          <div className="h-full bg-cover bg-center" style={{ backgroundImage: `url(${images[2].src})` }}></div>
        </div>
        {/* Fourth column */}
        {hasModal && (
          <div className="w-full md:w-1/4 h-64 bg-gray-500 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer" onClick={handleOpenModal}>
            <span className="text-white font-medium text-4xl">+{imageCount - 3}</span>
          </div>
        )}
      </div>
      {hasModal && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="bg-cover bg-center" style={{ backgroundImage: `url(${image.src})`, width: `${100 / imageCount}%` }}>
                <span className="sr-only">{`Image ${index + 1}`}</span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ImageGallery;
