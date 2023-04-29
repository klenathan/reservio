import React, {useEffect, useState} from "react";
import DatePicker from "components/Detail/Pricing/FlexiblePricing/DatePicker";
import TimeReservation from "components/Detail/Pricing/FlexiblePricing/TimeReservation";
import Button from "components/Button";
import {useAuth} from "components/Auth/Context/AuthContext";
import {useRouter} from "next/navigation";

interface ChoiceProps {
    name?: string
    hour?: number
    minutes?: number
}

interface PriceFlexibleProps {
    parentCallBack?: any
}

interface validTimeProps {
    isValid: boolean
    moveToNextDay: boolean
}

const PricingFlexible = (props: PriceFlexibleProps) => {
    const [endTime, setEndTime] = useState<ChoiceProps>()
    const [startTime, setStartTime] = useState<ChoiceProps>()
    const [validDate, setValidDate] = useState<validTimeProps>({
        isValid: true,
        moveToNextDay: false
    })

    const {isLogin} = useAuth()
    const {push} = useRouter()

    const handleCallBack = (childDate: any) => {
        if (childDate.name == 'startDate') {
            setStartTime(childDate)
        } else {
            setEndTime(childDate)
        }
    }

    const handleCallBackTheValueToTotalPrice = () => {
        if (endTime && startTime) {
            return {
                startDateString: startTime.hour + ':' + startTime.minutes,
                endDateString: endTime.hour + ':' + endTime.minutes
            }
        }
    }

    useEffect(() => {
        if (startTime?.hour && endTime?.hour) {
            if (endTime.hour < startTime.hour) {
                setValidDate({
                    isValid: false,
                    // TODO: Change when have the Date picker
                    moveToNextDay: true
                })
            } else {
                setValidDate({
                    isValid: true,
                    // TODO: Change when have the Date picker
                    moveToNextDay: false
                })
            }
        }
    }, [startTime, endTime])


    return (
        <div>
            <DatePicker/>
            <TimeReservation countReservation={200} maxQuantity={300} parentCallBack={handleCallBack}/>
            <div className={'flex w-full justify-center '}>
                <Button
                    btnStyle={"filled"}
                    disabled={!validDate.isValid}
                    onClick={() => {
                        isLogin ?
                            props.parentCallBack(handleCallBackTheValueToTotalPrice)
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