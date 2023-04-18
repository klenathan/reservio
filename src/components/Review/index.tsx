import React, {useState} from "react";
import ReviewCard from "components/Review/ReviewCard";
import Modal from "components/Modal";

export interface IReview {
    username: string,
    avatar: string
    rating: number,
    feedback: string,
    createAt: string,
    onClick?: React.MouseEventHandler<HTMLElement>
}

interface ReviewProps {
    review: IReview[]
}

const Review: React.FC<ReviewProps> = (props: ReviewProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className={'flex flex-col justify-center border-b-2  border-gray-300 pb-2'}>
            <div className={'lg:grid grid-cols-2 gap-4'}>
                {props.review.map((review, index) => {
                        if (index < 4) {
                            return (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <ReviewCard
                                        username={review.username}
                                        avatar={review.avatar}
                                        rating={review.rating}
                                        feedback={review.feedback}
                                        createAt={review.createAt}
                                        onClick={handleOpenModal}
                                    />
                                </div>
                            )
                        }
                    }
                )}
            </div>
            {props.review.length > 4 ?
                <button key={"seeMore"}
                        className={"bg-transparent m-auto hover:bg-oliveGreen text-gray-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"}
                        onClick={handleOpenModal}
                >
                    See more feedback
                </button> : null
            }

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} nameModal={"Reviews"}>
                    <div>
                        {props.review.map((review, index) => {
                                // TODO [ADD] The feedback form
                                return (
                                    <div key={index} className="flex space-x-6 mb-10">
                                        <ReviewCard
                                            username={review.username}
                                            avatar={review.avatar}
                                            rating={review.rating}
                                            feedback={review.feedback}
                                            createAt={review.createAt}
                                            onClick={handleOpenModal}
                                        />
                                    </div>
                                )
                            }
                        )}
                    </div>

                </Modal>
            )}
        </div>

    )
}


export default Review