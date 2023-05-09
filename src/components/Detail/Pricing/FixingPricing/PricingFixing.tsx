import React from "react";
import {useAuth} from "components/Auth/Context/AuthContext";
import {useRouter} from "next/navigation";
import {ProductFixedTimeSlot} from "../../../../../Types";
import Button from "components/Button";

interface PriceFixingProps {
    productFixedTimeSlot: ProductFixedTimeSlot
    parentCallBack?: any
    price?: number
    confirm?: () => void

}

const PricingFixing: React.FC<PriceFixingProps> = (props: PriceFixingProps) => {
    const {isLogin} = useAuth()
    const {push} = useRouter()

    const startAt = new Date(props.productFixedTimeSlot.from)
    const endAt = new Date(props.productFixedTimeSlot.to)


    const startDate = {
        hour: startAt.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
        minutes: startAt.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }

    const endDate = {
        hour: endAt.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
        minutes: endAt.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
    }


    return (
        <div className={'border-2 border-neutral-300 rounded w-full py-2 px-4 hover:shadow-lg space-y-4'}>
            <div className={'flex justify-around'}>
                <div className={'text-center'}>
                    <div className={'font-bold'}>Start time</div>
                    <div>{startDate.hour} : {startDate.minutes}</div>
                </div>
                <div className={'text-center'}>
                    <div className={'font-bold'}>End time</div>
                    <div>{endDate.hour} : {endDate.minutes}</div>
                </div>
                <Button
                    btnStyle={"filled"}
                    onClick={() => {
                        isLogin ?
                            (props.parentCallBack({
                                id: props.productFixedTimeSlot.id,
                                price: props.price,
                                maxQuantity: props.productFixedTimeSlot.quantity,
                                countReservation: props.productFixedTimeSlot._count.ProuctReservation,
                                startTimeString: `${startDate.hour} : ${startDate.minutes}`,
                                endTimeString: `${endDate.hour} : ${endDate.minutes}`,
                            }),
                            props.confirm && props.confirm())

                            :
                            push('/login')
                    }}
                >
                    Book now
                </Button>
            </div>
            <div>
                <div className={'float-right font-extralight text-sm'}>
                    {props.productFixedTimeSlot._count.ProuctReservation} / {props.productFixedTimeSlot.quantity}
                </div>
                <div
                    className={'w-11/12 m-auto border-2 border-neutral-300 rounded-full bg-gray-200 text-white truncate'}>
                    <div
                        className={'bg-oliveGreen text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'}
                        style={{width: `${(props.productFixedTimeSlot._count.ProuctReservation / props.productFixedTimeSlot.quantity) * 100}%`}}>
                        {props.productFixedTimeSlot._count.ProuctReservation} / {props.productFixedTimeSlot.quantity}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PricingFixing;