import React, {useEffect, useState} from "react";
import TimeReservation from "components/Detail/Pricing/FlexiblePricing/TimeReservation";
import Button from "components/Button";
import {useAuth} from "components/Auth/Context/AuthContext";
import {useRouter} from "next/navigation";
import DatePicker from "components/Detail/Pricing/FlexiblePricing/DatePicker";
import {addDays, differenceInMinutes, set} from "date-fns";


interface ChoiceProps {
    startDate?: Date
    endDate?: Date
    name?: string
    hour?: number
    minutes?: number
}

interface PriceFlexibleProps {
    parentCallBack?: any
    price?: number
}

// TODO add the notification when the time not valid (in the same day the end time must higher than the start time)
const PricingFlexible = (props: PriceFlexibleProps) => {
    const [endTime, setEndTime] = useState<ChoiceProps>()
    const [startTime, setStartTime] = useState<ChoiceProps>()
    const [date, setDate] = useState<ChoiceProps>({
        startDate: new Date(),
        endDate: new Date()
    })

    const {isLogin} = useAuth()
    const {push} = useRouter()

    const handleTimeCallBack = (childTime: any) => {
        if (childTime.name == 'startDate') {
            setStartTime(childTime)
        } else {
            setEndTime(childTime)
        }
    }

    const handleDateCallBack = (childDate: any) => {
        setDate({
            startDate: childDate.startDate,
            endDate: childDate.endDate
        })
    }

    const calculatePrice = () => {
        if (!date?.startDate || !date?.endDate || !startTime?.hour || !endTime?.hour) {
            return {
                startTimeString: startTime?.hour + ':' + startTime?.hour,
                endTimeString: endTime?.hour + ':' + endTime?.hour,
                startDate: date.startDate,
                endDate: date.endDate,
                price: props.price
            }
        }

        const start = set(date.startDate, {hours: startTime.hour, minutes: startTime.minutes})
        const end = set(date.endDate, {hours: endTime.hour, minutes: endTime.minutes})
        const quantityOfHour = differenceInMinutes(end, start)

        const totalPrice = props.price as number * (quantityOfHour / 60)

        return {
            startTimeString: startTime.hour + ':' + startTime.minutes,
            endTimeString: endTime.hour + ':' + endTime.minutes,
            startDate: start,
            endDate: end,
            price: totalPrice
        }
    }

    useEffect(() => {
        if (!date?.startDate || !date?.endDate || !startTime?.hour || !endTime?.hour) {
            return;
        }
        const start = set(date.startDate, {hours: startTime.hour, minutes: startTime.minutes})
        const end = set(date.endDate, {hours: endTime.hour, minutes: endTime.minutes})
        
        if (differenceInMinutes(end, start) < 0) {
            setDate({
                startDate: date.startDate,
                endDate: addDays(date.endDate, 1)
            })

        }
    }, [endTime])


    return (
        <div>
            <DatePicker parentCallBack={handleDateCallBack} userEndDate={date.endDate}/>
            <TimeReservation countReservation={200} maxQuantity={300} parentCallBack={handleTimeCallBack}/>
            <div className={'flex w-full justify-center '}>
                <Button
                    btnStyle={"filled"}
                    onClick={() => {
                        isLogin ?
                            props.parentCallBack(calculatePrice)
                            :
                            push('/login')
                    }}
                >
                    Book now
                </Button>
            </div>

        </div>
    )
}
export default PricingFlexible;