import {FaStar} from "react-icons/fa";
import React, {useState} from "react";
import TotalPrice from "components/Detail/Pricing/TotalPrice";
import {useAuth} from "components/Auth/Context/AuthContext";
import PricingFlexible from "components/Detail/Pricing/FlexiblePricing/PricingFlexible";
import {ProductFixedTimeSlot, ProductPricingType} from "../../../../Types";
import PricingFixing from "components/Detail/Pricing/FixingPricing/PricingFixing";

interface PricingChoiceProps {
    startTimeString?: string;
    endTimeString?: string;
    startDate?: Date
    endDate?: Date
    maxQuantity?:number
    countReservation?:number
    id?: string
    price?: number;
}

interface PricingProps {
    price: number;
    id: string
    avgRating: number;
    countRating: number | undefined;
    productName: string;
    maxQuantity: number
    countReservation: number
    productFixedTimeSlot: ProductFixedTimeSlot[]
    type?: ProductPricingType
}

export default function Pricing(props: PricingProps) {
    const [choice, setChoice] = useState<PricingChoiceProps>({
        price: props.price,
        startDate: new Date(),
        endDate: new Date(),
    });

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

            {/*Fixing price*/}
            {props.type == "FIXED" && props.productFixedTimeSlot.map((fixedTime) => (
                <PricingFixing
                    key={fixedTime.id}
                    price={props.price}
                    productFixedTimeSlot={fixedTime}
                    parentCallBack={handleChoice}
                    confirm={handleIsConfirm}
                />
            ))}

            {/*Information display*/}
            {props.type == 'FLEXIBLE' &&
                <PricingFlexible
                    parentCallBack={handleChoice}
                    price={props.price}
                    confirm={handleIsConfirm}
                    countReservation={props.countReservation}
                    maxQuantity={props.maxQuantity}
                />
            }

            {/*Total price*/}
            {isConfirm &&
                <TotalPrice
                    endTime={choice?.endTimeString}
                    startTime={choice?.startTimeString}
                    price={choice.price as number}
                    userName={user?.username}
                    productName={props.productName}
                    parentCallBack={handleChoice}
                    startDate={choice?.startDate}
                    endDate={choice?.endDate}
                    maxQuantity={choice.maxQuantity as number}
                    countReservation={choice.countReservation as number}
                    isLogin={isLogin}
                    notConfirm={handleIsNotConfirm}
                    productId={props.id}
                    productFixedTimeSlotId={choice.id}
                />
            }
        </div>
    );
}
