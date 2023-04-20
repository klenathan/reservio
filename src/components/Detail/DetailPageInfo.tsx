import React, {useState} from "react";
import Picture from "components/Picture";
import Review, {IReview} from "components/Review";

interface DetailPageInfoProps {
    name: string;
    description: string;
    vendorName: string;
    avatar?: string,
}


const DetailPageInfo: React.FC<DetailPageInfoProps> = (props: DetailPageInfoProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    const rv: IReview[] = [
        {
            username: "Name",
            avatar: props.avatar,
            rating: 5,
            feedback:
                "Lorem ipsum dolor sit amet,urna. Nam eleifend ex sit amet risus pellentesque, sed gravida libero euismod. Phasellus vitae mauris vehicula odio posuere ornare. Nullam venenatis varius massa, at scelerisque magna ornare tempor. Morbi mattis, turpis sit amet posuere fermentum, ex diam efficitur neque, id tincidunt tellus nunc ut nulla. Integer faucibus iaculis gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut egestas elit vitae sagittis dignissim. Donec risus libero, mattis ut felis quis, ultrices maximus ipsum. Nam sollicitudin tellus eu risus condimentum vestibulum. Morbi ut nulla malesuada, lobortis diam in, mattis massa.\n",
            createAt: "September 2023",
        },
        {
            username: "Name 2",
            avatar: props.avatar,
            rating: 5,
            feedback:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula aliquet tincidunt. Vivamus a nisi fringilla, congue risus sit amet, maximus ante. Proin sed dignissim urna. Nam eleifend ex sit amet risus pellentesque, sed gravida libero euismod. Phasellus vitae mauris vehicula odio posuere ornare. Nullam venenatis varius massa, at scelerisque magna ornare tempor. Morbi mattis, turpis sit amet posuere fermentum, ex diam efficitur neque, id tincidunt tellus nunc ut nulla. Integer faucibus iaculis gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut egestas elit vitae sagittis dignissim. Donec risus libero, mattis ut felis quis, ultrices maximus ipsum. Nam sollicitudin tellus eu risus condimentum vestibulum. Morbi ut nulla malesuada, lobortis diam in, mattis massa.\n",
            createAt: "September 2023",
        },
        {
            username: "Name 3",
            avatar: props.avatar,
            rating: 5,
            feedback:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula aliquet tincidunt. Vivamus a nisi fringilla, congue risus sit amet, maximus ante. Proin sed dignissim urna. Nam eleifend ex sit amet risus pellentesque, sed gravida libero euismod. Phasellus vitae mauris vehicula odio posuere ornare. Nullam venenatis varius massa, at scelerisque magna ornare tempor. Morbi mattis, turpis sit amet posuere fermentum, ex diam efficitur neque, id tincidunt tellus nunc ut nulla. Integer faucibus iaculis gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut egestas elit vitae sagittis dignissim. Donec risus libero, mattis ut felis quis, ultrices maximus ipsum. Nam sollicitudin tellus eu risus condimentum vestibulum. Morbi ut nulla malesuada, lobortis diam in, mattis massa.\n",
            createAt: "September 2023",
        },
        {
            username: "Name 3",
            avatar: props.avatar,
            rating: 5,
            feedback:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula aliquet tincidunt. Vivamus a nisi fringilla, congue risus sit amet, maximus ante. Proin sed dignissim urna. Nam eleifend ex sit amet risus pellentesque, sed gravida libero euismod. Phasellus vitae mauris vehicula odio posuere ornare. Nullam venenatis varius massa, at scelerisque magna ornare tempor. Morbi mattis, turpis sit amet posuere fermentum, ex diam efficitur neque, id tincidunt tellus nunc ut nulla. Integer faucibus iaculis gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut egestas elit vitae sagittis dignissim. Donec risus libero, mattis ut felis quis, ultrices maximus ipsum. Nam sollicitudin tellus eu risus condimentum vestibulum. Morbi ut nulla malesuada, lobortis diam in, mattis massa.\n",
            createAt: "September 2023",
        },
        {
            username: "Name 3",
            avatar: props.avatar,
            rating: 5,
            feedback:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vehicula aliquet tincidunt. Vivamus a nisi fringilla, congue risus sit amet, maximus ante. Proin sed dignissim urna. Nam eleifend ex sit amet risus pellentesque, sed gravida libero euismod. Phasellus vitae mauris vehicula odio posuere ornare. Nullam venenatis varius massa, at scelerisque magna ornare tempor. Morbi mattis, turpis sit amet posuere fermentum, ex diam efficitur neque, id tincidunt tellus nunc ut nulla. Integer faucibus iaculis gravida. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut egestas elit vitae sagittis dignissim. Donec risus libero, mattis ut felis quis, ultrices maximus ipsum. Nam sollicitudin tellus eu risus condimentum vestibulum. Morbi ut nulla malesuada, lobortis diam in, mattis massa.\n",
            createAt: "September 2023",
        },
    ];


    return (
        <div className="flex flex-col md:items-start md:justify-start space-y-7 ">
            {/*Name and avatar*/}
            <div className="flex flex-row w-full border-b-2 border-gray-300 pb-2">
                <h2 className="text-gray-800 font-bold text-xl md:text-2xl md:ml-0 m-auto">
                    {props.name}
                </h2>
                <div className={"flex flex-col items-center ml-auto"}>
                    <div className="w-20 h-20 md:w-28 md:h-28 relative">
                        {props.avatar &&
                            <Picture src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.avatar}/>}
                    </div>
                    <div className={"text-xl"}>@{props.vendorName}</div>
                </div>
            </div>

            {/*Description*/}
            <div className="mb-4 border-b-2  border-gray-300 pb-2 w-full">
                <h3 className="text-gray-700 font-bold text-2xl mb-3">Description</h3>
                {props.description ? <div className="text-gray-600 text-xl">
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
                    </div> :
                    <div className={'text-2xl text-center font-bold'}> No information 😭😭😭😭😭 </div>
                }
            </div>

            {/*Review*/}
            <div>
                <h3 className="text-gray-700 font-bold text-2xl mb-3">Reviews</h3>
                {/*{props.review ?*/}
                <Review review={rv}/>

                {/*}*/}
            </div>
        </div>
    );
};

export default DetailPageInfo;
