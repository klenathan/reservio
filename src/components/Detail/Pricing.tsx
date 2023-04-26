import {FaStar} from "react-icons/fa";
import PricingInformation from "components/Detail/PricingInformation";
import React, {useState} from "react";
import TotalPrice from "components/Detail/TotalPrice";

interface ChoiceProps {
    start: string;
    end: string;
    totalPrice?: number;
}

interface PricingProps {
    price: number;
    avgRating: number;
    countRating: number | undefined;
    userName?: string;
    productName: string;
}

export default function Pricing(props: PricingProps) {
    const [choice, setChoice] = useState<ChoiceProps>();
    const handleChoice = (childData: any) => {
        setChoice(childData);
    };

    const dot = <span className="mx-1">&#8226;</span>;

    return (
        <div className={"w-full p-0 lg:p-5 space-y-4"}>
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
            <PricingInformation
                start={"10:30"}
                end={"11:00"}
                maxQuantity={300}
                countReservation={100}
                parentCallBack={handleChoice}
            />

            {/*Total price*/}
            {props.userName ?
                <TotalPrice
                    end={choice?.end}
                    start={choice?.start}
                    price={props.price}
                    userName={props.userName}
                    productName={props.productName}
                    parentCallBack={handleChoice}
                    maxQuantity={300}
                    countReservation={100}
                /> :
                <TotalPrice
                    end={choice?.end}
                    start={choice?.start}
                    price={props.price}
                    userName={"Honneyyy 😘😘😘😘"}
                    productName={props.productName}
                    parentCallBack={handleChoice}
                    maxQuantity={300}
                    countReservation={100}
                />
            }
        </div>
    );
}
