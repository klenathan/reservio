import {FaStar} from "react-icons/fa";
import React, {useState} from "react";
import Modal from "components/Modal";
import Pricing from "components/Detail/Pricing/Pricing";
import {ProductFixedTimeSlot, ProductPricingType} from "../../../../Types";

interface FloatingButtonPricingProps {
    price: number;
    avgRating: number;
    countReviews: number | undefined;
    productName: string
    userName?: string
    productFixedTimeSlot: ProductFixedTimeSlot[]
    maxQuantity: number
    id: string
    countReservation: number
    type: ProductPricingType
}

const FloatingButtonPricing: React.FC<FloatingButtonPricingProps> = (
    props: FloatingButtonPricingProps
) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div
                className={"flex flex-row w-full justify-between"}
                onClick={handleOpenModal}
            >
                <div className={"font-bold text-xl md:text-2xl"}>
                    ₫{props.price.toLocaleString()}/person
                </div>
                <div className={"inline-flex items-center md:text-lg"}>
                    <FaStar className="mr-1"/>
                    <div>{props.avgRating}</div>
                    <span className="mx-1">&#8226;</span>
                    <div>{props.countReviews} Reviews</div>
                </div>
            </div>
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    nameModal={"Buy me ☕"}
                >
                    <div className={'overflow-auto scroll-auto w-screen h-[calc(100vh_-_18rem)] max-w-prose px-6 py-6'}>
                        <Pricing
                            price={props.price}
                            avgRating={props.avgRating}
                            countRating={props.countReviews}
                            productName={props.productName}
                            countReservation={props.countReservation}
                            maxQuantity={props.maxQuantity}
                            type={props.type}
                            id={props.id}
                            productFixedTimeSlot={props.productFixedTimeSlot}
                        />
                    </div>

                </Modal>
            )}
        </>
    );
};

export default FloatingButtonPricing;
