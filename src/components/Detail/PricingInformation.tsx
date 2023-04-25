import Button from "components/Button";
import React from "react";

interface PriceInformationProps {
    start: string
    end: string
    maxQuantity: number
    countReservation: number
    parentCallBack?: any
}

const PricingInformation: React.FC<PriceInformationProps> = (props: PriceInformationProps) => {
    return (
        <div className={'border-2 border-neutral-300 rounded w-full p-2 hover:shadow-lg space-y-4'}>
            <div className={'flex justify-between'}>
                <div className={'text-center'}>
                    <div className={'font-bold'}>Start time</div>
                    <div>{props.start}</div>
                </div>
                <div className={'text-center'}>
                    <div className={'font-bold'}>End time</div>
                    <div>{props.end}</div>
                </div>
                <Button
                    btnStyle={"filled"}
                    onClick={() => {
                        props.parentCallBack({
                            start: props.start,
                            end: props.end,
                        })
                    }}
                >
                    Book now
                </Button>
            </div>
            <div className={'w-11/12 m-auto border-2 border-neutral-300 rounded-full bg-gray-200 text-white'}>
                <div
                    className={'bg-oliveGreen text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'}
                    style={{width: `${(props.countReservation / props.maxQuantity) * 100}%`}}>
                    {props.countReservation} / {props.maxQuantity}
                </div>
            </div>
        </div>
    )
}

export default PricingInformation;