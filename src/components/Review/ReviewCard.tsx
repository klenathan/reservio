import React from "react";
import {IReview} from "components/Review/index";
import Picture from "components/Picture";
import {FaStar} from "react-icons/fa";


const ReviewCard: React.FC<IReview> = (props: IReview) => {
    const dot = <span className="mx-1">&#8226;</span>;
    return (
        <div>
            <div className={'flex flex-row space-x-1.5'} onClick={props.onClick}>
                <div className={"w-10 h-10 relative"}>
                    {props.avatar && <Picture src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.avatar}/>}
                </div>
                <div className={'flex flex-col'}>
                    <div className={'flex flex-row items-center text-m font-bold'}>
                        {props.username}
                        {dot}
                        <FaStar className="mr-1"/>
                        <span>{props.rating.toFixed(1)}</span>
                    </div>
                    <div>
                        {props.createAt}
                    </div>
                </div>
            </div>

            <div>
                {props.feedback}
            </div>
        </div>
    )
}

export default ReviewCard