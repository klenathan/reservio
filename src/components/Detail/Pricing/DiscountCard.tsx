import {TfiTicket} from "react-icons/tfi";
import React, {useEffect, useState} from "react";
import Button from "components/Button";
import {differenceInMinutes, formatDistanceToNow, isFuture, isPast} from "date-fns";

interface DiscountCardProps {
    id: string
    name: string
    desc: string
    amount: number
    startDate: string
    endDate: string
    onClose?: () => void
    parentCallBack?: any
}

const DiscountCard = (props: DiscountCardProps) => {
    const [isEnd, setIsEnd] = useState<boolean>(isPast(new Date(props.endDate)))
    const [isComing, setIsComing] = useState<boolean>(isFuture(new Date(props.startDate)))
    const [doing, setDoing] = useState<boolean>(true)

    const startDate = new Date(props.startDate)
    const endDate = new Date(props.endDate)
    const dateNow = new Date()

    const startToNow = Math.abs(differenceInMinutes(startDate, dateNow))
    const endToNow = Math.abs(differenceInMinutes(endDate, dateNow))

    const timeAvailable = formatDistanceToNow(endDate)

    const handleDiscount = () => {
        return {
            id: props.id,
            name: props.name,
            amount: props.amount
        }
    }


    useEffect(() => {
        setInterval(() => {
            if (isEnd || isComing) {
                setDoing(false)
            }
            setIsEnd(isPast(new Date(props.endDate)))
            setIsComing(isFuture(new Date(props.startDate)))

        }, 10000)

    })

    return (
        <div className={'w-full h-fit border-4 border-neutral-300 rounded-lg space-y-4 p-2 snap-center snap-always'}>
            {/*Discount amount*/}
            <div className={'flex flex-row space-x-10 items-center justify-center lg:space-x-40'}>
                <div className={'flex flex-col items-center'}>
                    <TfiTicket className={'text-5xl lg:text-6xl'}/>
                    <div className={'w-20 text-center font-bold'}>
                        {props.name}
                    </div>
                </div>
                {/*<div className={'inline-flex space-x-4 items-center shrink-0'}>*/}
                <div className={'flex flex-col items-center font-bold'}>
                    <div className={'text-2xl tracking-widest font-mono lg:text-5xl'}>
                        {props.amount}%
                    </div>
                    <div className={'text-xl lg:text-2xl'}>
                        Discount
                    </div>
                </div>

                <div className={'flex flex-col'}>
                    <div className={'flex flex-col items-center'}>
                        <div className={'font-bold'}>
                            Start Time
                        </div>
                        <div>
                            Apr 12 2023
                        </div>
                    </div>
                    <div className={'flex flex-col items-center'}>
                        <div className={'font-bold'}>
                            End Time
                        </div>
                        <div>
                            Apr 12 2023
                        </div>
                    </div>
                </div>

                {/*</div>*/}
            </div>

            {/*    Description*/}
            <div className={'text-justify'}>
                {props.desc}
            </div>

            {/*    Amount time*/}
            <div className={'flex flex-col items-center'}>
                <div className={'font-bold'}>
                    Available Time
                </div>
                {isEnd && <div>😵 Out of time 😵</div>}
                {isComing && <div>😘 Coming soon 😘 </div>}
                {doing &&
                    <div
                        className={'w-11/12 m-auto border-2 border-neutral-300  rounded-full bg-gray-200 text-white truncate'}>
                        <div
                            className={'bg-oliveGreen text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'}
                            style={{width: `${100 - ((startToNow / endToNow) * 100)}%`}}>
                            {timeAvailable}
                        </div>
                    </div>}
            </div>
            <div className={'flex w-full justify-center '}>
                <Button btnStyle={"filled"} onClick={() => {
                    props.parentCallBack(handleDiscount)
                    props.onClose && props.onClose()
                }}>
                    Choose me 😘
                </Button>
            </div>


        </div>
    )
}

export default DiscountCard