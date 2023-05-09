import React, {useState} from "react";
import Picture from "components/Picture";
import Review from "components/Review";

interface DetailPageInfoProps {
    name: string;
    description: string;
    vendorName: string;
    avatar?: string;
    reviews: Review[];
}

const DetailPageInfo: React.FC<DetailPageInfoProps> = (
    props: DetailPageInfoProps
) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col md:items-start md:justify-start space-y-7 ">
            {/*Name and avatar*/}
            <div className="flex flex-row w-full border-b-2 border-gray-300 pb-2 justify-between">
                <div className={'flex items-center space-x-4 md:space-x-20'}>
                    <div className={"flex flex-col md:ml-0 m-auto"}>
                        <div className="w-20 h-20 md:w-28 md:h-28 relative items-center">
                            {props.avatar && (
                                <Picture
                                    src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.avatar}
                                />
                            )}
                        </div>
                        <div className={"text-xl font-medium"}>@{props.vendorName}</div>
                    </div>
                    <div>
                        <h2 className="text-gray-800 font-bold text-2xl md:text-2xl">
                            {props.name}
                        </h2>

                        {/*Description*/}

                        <div className=" border-gray-300 pb-2 w-full">
                            <h3 className="text-gray-700 font-bold text-lg mb-3">Description</h3>
                            {props.description ? (
                                <div className="text-gray-600 text-xl">
                                    {isExpanded ? (
                                        props.description
                                    ) : (
                                        <div className={"line-clamp-3"}>{props.description}</div>
                                    )}
                                    {!isExpanded && props.description.length > 200 && (
                                        <button
                                            className="text-black-500 hover:text-blue-700 font-semibold"
                                            onClick={toggleDescription}
                                        >
                                            See more
                                        </button>
                                    )}
                                    {isExpanded && (
                                        <button
                                            className="text-black-500 hover:text-blue-700 font-semibold"
                                            onClick={toggleDescription}
                                        >
                                            See less
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <div className={"text-2xl text-center font-bold"}>
                                    No information 😭😭😭😭😭
                                </div>
                            )}
                        </div>
                    </div>

                </div>


            </div>

            {/*Review*/}
            <div className={"border-b-2 border-gray-300 pb-2 w-full"}>
                <h3 className="text-gray-700 font-bold text-2xl mb-3">Reviews</h3>
                {props.reviews ? (
                    <Review review={props.reviews}/>
                ) : (
                    <div className={"text-2xl text-center font-bold"}>
                        Reviews are not found 😭😭😭😭
                    </div>
                )}
            </div>
        </div>
    );
};

export default DetailPageInfo;
