import Button from "components/Button";
import React from "react";
import {useAuth} from "components/Auth/Context/AuthContext";
import {useRouter} from "next/navigation";

interface PriceFixingProps {
    start: string
    end: string
    maxQuantity: number
    countReservation: number
    parentCallBack?: any
}

const PricingFixing: React.FC<PriceFixingProps> = (props: PriceFixingProps) => {
    const {isLogin} = useAuth()
    const {push} = useRouter()


    return (
        <div className={'border-2 border-neutral-300 rounded w-full py-2 px-4 hover:shadow-lg space-y-4'}>
            <div className={'flex justify-around'}>
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
                        isLogin ?
                            props.parentCallBack({
                                startDateString: props.start,
                                endDateString: props.end,
                            })
                            :
                            push('/login')
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

export default PricingFixing;