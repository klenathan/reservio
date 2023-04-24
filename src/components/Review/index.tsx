import React, { useState } from "react";
import ReviewCard from "components/Review/ReviewCard";
import Modal from "components/Modal";
import { Review } from "../../../Types";

const Review = (props: { review: Review[] }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={"flex flex-col justify-center"}>
      <div className={"lg:grid grid-cols-2 gap-4"}>
        {props.review.map((review, index) => {
          if (index < 4) {
            return (
              <div key={index} className="flex space-x-2 mb-2 line-clamp-5">
                <ReviewCard
                  username={review.user.username}
                  avatar={review.user.avatar}
                  rating={review.rating}
                  feedback={review.feedback}
                  createAt={review.createAt}
                  onClick={handleOpenModal}
                />
              </div>
            );
          }
        })}
      </div>
      {props.review.length > 4 ? (
        <button
          key={"seeMore"}
          className={
            "bg-transparent m-auto hover:bg-oliveGreen text-gray-700 font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
          }
          onClick={handleOpenModal}
        >
          See more feedback
        </button>
      ) : null}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          nameModal={"Reviews"}
        >
          <div>
            {props.review.map((review, index) => {
              return (
                <div key={index} className="flex space-x-6 mb-10">
                  <ReviewCard
                    username={review.user.username}
                    avatar={review.user.avatar}
                    rating={review.rating}
                    feedback={review.feedback}
                    createAt={review.createAt}
                    onClick={handleOpenModal}
                  />
                </div>
              );
            })}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Review;
