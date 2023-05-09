import React from "react";
import TimePicker from "components/Detail/Pricing/FlexiblePricing/TimePicker";

interface TimeReservationProps {
    parentCallBack?: any
}


const TimeReservation: React.FC<TimeReservationProps> = (props: TimeReservationProps) => {

    const handleCallback = (childDate: any) => {
        props.parentCallBack(childDate)
    }


    return (
        <div
            className={'flex flex-col space-y-4 outline outline-2 rounded-xl outline-neutral-200 hover:outline-black mt-4 py-2 px-4 mb-4'}>
            <div className={'flex flex-col w-full space-y-4'}>
                <div className={'inline-flex place-items-center justify-around w-full '}>
                    <div className={'font-bold '}>Start time</div>
                    <TimePicker
                        name={'startDate'}
                        parentCallBack={handleCallback}
                    />
                </div>
                <div className={'inline-flex  place-items-center  justify-around w-fulls'}>
                    <div className={'font-bold'}>End time</div>
                    <TimePicker
                        name={'endDate'}
                        parentCallBack={handleCallback}
                    />
                </div>
            </div>
        </div>
    )
}

export default TimeReservation