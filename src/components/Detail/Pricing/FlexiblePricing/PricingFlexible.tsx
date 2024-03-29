import React, {useEffect, useState} from "react";
import TimeReservation from "components/Detail/Pricing/FlexiblePricing/TimeReservation";
import Button from "components/Button";
import {useAuth} from "components/Auth/Context/AuthContext";
import {useRouter} from "next/navigation";
import DatePicker from "components/Detail/Pricing/FlexiblePricing/DatePicker";
import {addDays, differenceInMinutes, set} from "date-fns";

interface ChoiceProps {
    startDate?: Date;
    endDate?: Date;
    name?: string;
    hour?: number;
    minutes?: number;
    countReservation?: number;
}

interface PriceFlexibleProps {
    parentCallBack?: any;
    price?: number;
    confirm?: () => void;
    maxQuantity: number;
    countReservation: number;
}

const PricingFlexible = (props: PriceFlexibleProps) => {
    const [endTime, setEndTime] = useState<ChoiceProps>();
    const [startTime, setStartTime] = useState<ChoiceProps>();
    const [date, setDate] = useState<ChoiceProps>({
        startDate: new Date(),
        endDate: new Date(),
    });

    const {isLogin} = useAuth();
    const {push} = useRouter();

    const handleTimeCallBack = (childTime: any) => {
        if (childTime.name == "startDate") {
            setStartTime(childTime);
        } else {
            setEndTime(childTime);
        }
    };

    const handleDateCallBack = (childDate: any) => {
        setDate({
            startDate: childDate.startDate,
            endDate: childDate.endDate,
        });
    };

    const calculatePrice = () => {
        if (
            !date?.startDate ||
            !date?.endDate ||
            !startTime?.hour ||
            !endTime?.hour
        ) {
            return {
                startTimeString: startTime?.hour + ":" + startTime?.minutes,
                endTimeString: endTime?.hour + ":" + endTime?.minutes,
                startDate: date.startDate,
                endDate: date.endDate,
                price: 0,
            };
        }

        const start = set(date.startDate, {
            hours: startTime.hour,
            minutes: startTime.minutes,
        });
        const end = set(date.endDate, {
            hours: endTime.hour,
            minutes: endTime.minutes,
        });
        const quantityOfHour = differenceInMinutes(end, start);

        let totalPrice;

        if (quantityOfHour > 0) {
            totalPrice = (props.price as number) * (quantityOfHour / 60);
        } else {
            totalPrice = (props.price as number) * (0 / 60);
        }

        return {
            startTimeString: startTime.hour + ":" + startTime.minutes,
            endTimeString: endTime.hour + ":" + endTime.minutes,
            startDate: start,
            endDate: end,
            price: totalPrice,
        };
    };

    useEffect(() => {
        if (
            !date?.startDate ||
            !date?.endDate ||
            !startTime?.hour ||
            !endTime?.hour
        ) {
            return;
        }
        const start = set(date.startDate, {
            hours: startTime.hour,
            minutes: startTime.minutes,
        });
        const end = set(date.endDate, {
            hours: endTime.hour,
            minutes: endTime.minutes,
        });

        if (differenceInMinutes(end, start) < 0) {
            setDate({
                startDate: date.startDate,
                endDate: addDays(date.endDate, 1),
            });
        }
    }, [
        date.endDate,
        date.startDate,
        endTime,
        startTime?.hour,
        startTime?.minutes,
    ]);

    useEffect(() => {
        props.parentCallBack(calculatePrice())
    }, [date.endDate,
        date.startDate,
        endTime,
        startTime?.hour,
        startTime?.minutes,])

    return (
        <div>
            <DatePicker
                parentCallBack={handleDateCallBack}
                userEndDate={date.endDate}
            />
            <TimeReservation parentCallBack={handleTimeCallBack}/>
            <div className={"flex w-full justify-center "}>
                <Button
                    btnStyle={"filled"}
                    onClick={() => {
                        isLogin
                            ? (props.parentCallBack(calculatePrice),
                            props.confirm && props.confirm())
                            : push("/login");
                    }}
                >
                    Book now
                </Button>
            </div>
        </div>
    );
};
export default PricingFlexible;
