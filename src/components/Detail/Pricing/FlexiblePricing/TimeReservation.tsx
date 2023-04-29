import React from "react";
import TimePicker from "components/Detail/Pricing/FlexiblePricing/TimePicker";

interface TimeReservationProps {
    countReservation: number
    maxQuantity: number
    parentCallBack?: any
}


const TimeReservation: React.FC<TimeReservationProps> = (props: TimeReservationProps) => {

    const handleCallback = (childDate: any) => {
        props.parentCallBack(childDate)
    }

    return (
        <div
            className={'flex flex-col space-y-4  outline outline-2 rounded-xl outline-neutral-200 hover:outline-black mt-4 p-2 mb-4'}>
            <div className={'flex flex-col w-full space-y-4'}>
                <div className={'inline-flex text-center place-items-center justify-around w-full '}>
                    <div className={'font-bold '}>Start time</div>
                    <TimePicker
                        name={'startDate'}
                        parentCallBack={handleCallback}
                    />
                </div>
                <div className={'inline-flex text-center place-items-center  justify-around w-fulls'}>
                    <div className={'font-bold'}>End time</div>
                    <TimePicker
                        name={'endDate'}
                        parentCallBack={handleCallback}
                    />
                </div>
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

export default TimeReservation