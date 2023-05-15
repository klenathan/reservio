import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import LoadingSpinner from "components/LoadingSpinner";
import useFetch from "@/Helper/ClientFetch/useFetch";
import ReactStars from "react-stars";
import TextareaAutosize from "react-textarea-autosize";
import { BiCommentDetail } from "react-icons/bi";
import { StringLiteral } from "typescript";
import { Review } from "../../../Types";
import apiClient from "@/config/axios.config";
import { SubmitHandler, useForm } from "react-hook-form";

interface IRatingModal {
  id: string;
  status: string;
  star: number;
  ratingComment: string;
}

const RatingModal = (props: IRatingModal) => {
  // const { data, error, isLoading } = useFetch<Review>(`reservation/${slugs.params.id}`);
  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }
  const [starValue, setStarValue] = useState<number>(props.star);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(props.ratingComment);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState<boolean>(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleRatingChange = (newRating: number) => {
    if (newRating === starValue) {
      // If the selected rating is the same as the current rating value, set it to zero
      setStarValue(0);
    } else {
      // Otherwise, update the rating value with the new selected rating
      setStarValue(newRating);
    }
  };

  const handleRatingSubmit = () => {
    setIsModalOpen(false);
    setIsRatingSubmitted(true);
    setStarValue(starValue);
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentValue(event.target.value);
  };
  const isDisabled = props.status === "RATED";
  const isSubmitDisabled = starValue === 0; // Check if ratingValue is zero

  return (
    <>
      {(props.status === "END" || props.status === "RATED") && (
        <div className="flex w-full shadow-xl rounded-md text-xs md:text-lg">
          <Button btnStyle="filled" onClick={handleModalOpen}>
            {isDisabled ? "RATED" : "Rate & Feedback"}
          </Button>
          <Modal
            nameModal={"Rating & Feedback"}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          >
            <div className="flex flex-col items-center mb-3">
              <div className="leading-10 mt-3">
                <ReactStars
                  count={5}
                  size={52}
                  color2={"#ffd700"}
                  value={starValue}
                  onChange={handleRatingChange}
                  edit={isDisabled ? false : true}
                />
              </div>
              <form className="w-4/5 md:w-4/5 relative mt-3 mb-7">
                <BiCommentDetail className="pointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 ml-3 text-[#59981A]" />
                {isRatingSubmitted ? (
                  <TextareaAutosize
                    className="w-full pl-10 rounded-2xl border-2 border-solid border-gray-500 text-xs md:text-xs py-1"
                    name="Search"
                    placeholder="Share your experience with other customers!"
                    value={commentValue}
                    onChange={handleCommentChange}
                    disabled
                    style={{ resize: "none" }}
                  />
                ) : (
                  <TextareaAutosize
                    className="w-full pl-10 rounded-2xl border-2 border-solid border-gray-500 text-xs md:text-xs py-1"
                    name="Search"
                    placeholder="Share your experience with other customers!"
                    value={commentValue}
                    onChange={handleCommentChange}
                    style={{ resize: "none" }}
                  />
                )}
              </form>

              <Button
                className={`rounded-lg font-semibold shadow hover:shadow-xl px-4 py-3 text-white ${
                  isSubmitDisabled || isRatingSubmitted || isDisabled
                    ? "bg-gradient-to-tr from-[#BDBDBD] to-[#9E9E9E]"
                    : "bg-gradient-to-tr from-midGreen to-limeGreen"
                }`}
                btnStyle="bomaytulam"
                onClick={handleRatingSubmit}
                disabled={isSubmitDisabled || isRatingSubmitted || isDisabled}
              >
                Submit Rating
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default RatingModal;
