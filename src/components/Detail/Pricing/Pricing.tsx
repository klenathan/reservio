import {FaStar} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import TotalPrice from "components/Detail/Pricing/TotalPrice";
import {useAuth} from "components/Auth/Context/AuthContext";
import PricingFlexible from "components/Detail/Pricing/FlexiblePricing/PricingFlexible";
import {ProductPricingType} from "../../../../Types";
import PricingFixing from "components/Detail/Pricing/PricingFixing";

interface PricingChoiceProps {
    startTimeString?: string;
    endTimeString?: string;
    startDate?: Date
    endDate?: Date
    price?: number;
}

interface PricingProps {
    price: number;
    avgRating: number;
    countRating: number | undefined;
    productName: string;
    type?: ProductPricingType
}

export default function Pricing(props: PricingProps) {
    const [choice, setChoice] = useState<PricingChoiceProps>({
        startDate: new Date(),
        endDate: new Date()
    });
    const [price, setPrice] = useState<number>(props.price);
    const [isConfirm, setIsConfirm] = useState<boolean>(false)
    const {isLogin, user} = useAuth()
    const handleChoice = (childData: any) => {
        setChoice(childData);
    };

    const handleIsConfirm = () => {
        setIsConfirm(true)
    }

    const handleIsNotConfirm = () => {
        setIsConfirm(false)
    }

    useEffect(() => {
        if (choice?.price) {
            setPrice(choice.price)
        }
    }, [choice?.price])

    const dot = <span className="mx-1">&#8226;</span>;

    return (
        <div className={"w-full p-2 lg:p-5 space-y-4"}>
            {/*Price display*/}
            <div className={"flex flex-row w-full justify-between"}>
                <div className={"font-bold text-lg"}>
                    ₫{props.price.toLocaleString()}/person
                </div>
                <div className={"inline-flex text-sm items-center"}>
                    <FaStar className="mr-1"/>
                    <div>{props.avgRating}</div>
                    {dot}
                    <div>{props.countRating} Reviews</div>
                </div>
            </div>

            {/*Information display*/}
            {props.type == 'FIXING' ?
                <PricingFixing
                    start={"10:30"}
                    end={"11:00"}
                    maxQuantity={300}
                    countReservation={100}
                    parentCallBack={handleChoice}

                /> :
                <PricingFlexible
                    parentCallBack={handleChoice}
                    price={props.price}
                    confirm={handleIsConfirm}
                />
            }


            {/*Total price*/}
            {isConfirm ?
                <TotalPrice
                    endTime={choice?.endTimeString}
                    startTime={choice?.startTimeString}
                    price={price}
                    userName={user?.username}
                    productName={props.productName}
                    parentCallBack={handleChoice}
                    startDate={choice?.startDate}
                    endDate={choice?.endDate}
                    maxQuantity={300}
                    countReservation={100}
                    isLogin={isLogin}
                    notConfirm={handleIsNotConfirm}
                /> :
                null
            }

        </div>
    );
}
