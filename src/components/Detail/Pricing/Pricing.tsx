import {FaStar} from "react-icons/fa";
import React, {useState} from "react";
import TotalPrice from "components/Detail/Pricing/TotalPrice";
import {useAuth} from "components/Auth/Context/AuthContext";
import PricingFlexible from "components/Detail/Pricing/FlexiblePricing/PricingFlexible";

interface PricingChoiceProps {
    startDateString: string;
    endDateString: string;
    startDateNum?: number
    endDateNum?: number
    totalPrice?: number;
}

interface PricingProps {
    price: number;
    avgRating: number;
    countRating: number | undefined;
    productName: string;
}

export default function Pricing(props: PricingProps) {
    const [choice, setChoice] = useState<PricingChoiceProps>();
    const {isLogin, user} = useAuth()
    const handleChoice = (childData: any) => {
        setChoice(childData);
    };

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

            {/*<PricingFixing*/}
            {/*    start={"10:30"}*/}
            {/*    end={"11:00"}*/}
            {/*    maxQuantity={300}*/}
            {/*    countReservation={100}*/}
            {/*    parentCallBack={handleChoice}*/}
            {/*/>*/}
            <PricingFlexible
                parentCallBack={handleChoice}
            />

            {/*Total price*/}
            <TotalPrice
                end={choice?.endDateString}
                start={choice?.startDateString}
                price={props.price}
                userName={user?.username}
                productName={props.productName}
                parentCallBack={handleChoice}
                startDate={'Mar 30 2023'}
                endDate={'Mar 30 2023'}
                maxQuantity={300}
                countReservation={100}
                isLogin={isLogin}
            />
        </div>
    );
}
