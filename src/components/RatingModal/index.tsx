import { useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import ReactStars from "react-stars";
import TextareaAutosize from "react-textarea-autosize";
import { BiCommentDetail } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../Form";
import usePost from "@/Helper/ClientFetch/usePost";

interface IRatingModal {
  productId: string;
  resevationId: string;
  status: string;
  rating: number;
  feedback: string;
}

const RatingModal = (props: IRatingModal) => {
  const [starValue, setStarValue] = useState<number>(props.rating);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(props.feedback);
  const [isRatingSubmitted, setIsRatingSubmitted] = useState<boolean>(false);
  const [productId, setProductId] = useState(props.productId);
  const [reservationId, setReservationId] = useState(props.resevationId);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleRatingChange = (newRating: number) => {
    if (newRating === starValue) {
      setStarValue(0);
    } else {
      setStarValue(newRating);
    }
  };
  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentValue(event.target.value);
  };
  console.log(commentValue);
  const isDisabled = props.status == "RATED" ? true : false;
  const isSubmitDisabled = starValue === 0; // Check if ratingValue is zero
  const { response, isPosting, post } = usePost(`review`);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm<IRatingModal>();

  const onSubmit: SubmitHandler<IRatingModal> = async (data) => {
    const formData = new FormData();

    formData.append("rating", starValue as unknown as string);
    formData.append("feedback", commentValue);
    formData.append("productId", productId);
    formData.append("reservationId", reservationId);

    try {
      await post(formData);
      setIsModalOpen(false);
      setIsRatingSubmitted(true);
      setStarValue(starValue);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full shadow-xl rounded-md text-xs md:text-lg">
      <Button btnStyle="filled" onClick={handleModalOpen}>
        {isDisabled ? "RATED" : "Rate & Feedback"}
      </Button>
      <Modal
        nameModal={"Rating & Feedback"}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full relative my-4 text-center"
        >
          <div className="w-full flex flex-col items-center">
            <div className="leading-10 mb-3">
              <ReactStars
                count={5}
                size={40}
                color2={"#ffd700"}
                value={starValue}
                onChange={handleRatingChange}
                edit={isDisabled ? false : true}
              />
            </div>
            <div className="flex justify-center items-center">
              {isRatingSubmitted ? (
                <TextareaAutosize
                  className="w-full p-2 ml-1 lg:ml-4 rounded-2xl border-2 border-solid border-gray-500 text-xs md:text-xs py-1"
                  name="Search"
                  placeholder="Share your experience with other customers!"
                  value={commentValue}
                  onChange={handleCommentChange}
                  disabled
                  style={{ resize: "none" }}
                />
              ) : (
                <TextareaAutosize
                  className="w-full p-2 ml-1 lg:ml-4 rounded-2xl border-2 border-solid border-gray-500 text-xs md:text-xs py-1"
                  name="Search"
                  placeholder="Share your experience with other customers!"
                  value={commentValue}
                  onChange={handleCommentChange}
                  style={{ resize: "none" }}
                />
              )}
              <BiCommentDetail size={30} className="text-[#59981A] mr-2 ml-4" />
            </div>
            <Button
              className={`my-2 rounded-lg font-semibold shadow hover:shadow-xl px-3 py-2 text-white text-base ${
                isSubmitDisabled || isRatingSubmitted || isDisabled
                  ? "bg-gradient-to-tr from-[#BDBDBD] to-[#9E9E9E]"
                  : "bg-gradient-to-tr from-midGreen to-limeGreen"
              }`}
              btnStyle="custom"
              disabled={isSubmitDisabled || isRatingSubmitted || isDisabled}
            >
              Submit Rating
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default RatingModal;
