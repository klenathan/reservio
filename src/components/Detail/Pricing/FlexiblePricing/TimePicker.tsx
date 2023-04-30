import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import Select from 'react-select';

type TimePickerOption = {
    label: string;
    value: number;
};

type TimeSelected = {
    name?: string
    hour?: number
    minutes?: number
}

interface TimePickerProps {
    name?: string
    parentCallBack?: any
}


const TimePicker: React.FC<TimePickerProps> = (props: TimePickerProps) => {
    const {
        control,
        formState: {errors},
        watch
    } = useForm({
        mode: 'onChange',
    });

    const [selectedTime, setSelectedTime] = useState<TimeSelected | null>(null);

    const hourOption: TimePickerOption[] = Array.from({length: 24}, (_, i) => ({
        label: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
        value: i
    }))
    const minutesOption: TimePickerOption[] = Array.from([0, 30], i => ({
        label: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
        value: i
    }))


    const hourChosen = useRef<TimePickerOption>()
    const minutesChosen = useRef<TimePickerOption>()

    hourChosen.current = watch('hour', '')
    minutesChosen.current = watch('minutes', '')

    const dateNow = new Date()
    let hourNow = dateNow.getHours()
    let minutesNow: number

    if (0 < dateNow.getMinutes() && dateNow.getMinutes() < 30) {
        minutesNow = 30
    } else if (dateNow.getMinutes() >= 30 && dateNow.getMinutes() < 60) {
        hourNow++
        minutesNow = 0
    } else {
        minutesNow = 0
    }

    useEffect(() => {
        if (!hourChosen.current?.value && !minutesChosen.current?.value) {
            setSelectedTime(
                {
                    name: props.name,
                    hour: hourNow,
                    minutes: minutesNow
                }
            )
        } else if (!hourChosen.current?.value && minutesChosen.current?.value) {
            setSelectedTime(
                {
                    name: props.name,
                    hour: hourNow,
                    minutes: minutesChosen.current?.value
                }
            )
        } else if (hourChosen.current?.value && !minutesChosen.current?.value) {
            setSelectedTime(
                {
                    name: props.name,
                    hour: hourChosen.current?.value,
                    minutes: minutesNow
                }
            )
        } else {
            setSelectedTime(
                {
                    name: props.name,
                    hour: hourChosen.current?.value,
                    minutes: minutesChosen.current?.value
                }
            )
        }


    }, [hourChosen.current, minutesChosen.current])

    useEffect(() => {
        if (selectedTime) {
            props.parentCallBack(selectedTime)
        }
    }, [selectedTime, props.parentCallBack])


    return (
        <div className="inline-flex items-center space-x-2">
            <Controller
                name={'hour'}
                control={control}
                defaultValue={0}
                render={({field}) => (
                    <Select
                        {...field}
                        isSearchable={false}
                        options={hourOption}
                        placeholder={hourNow.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
                        className="w-full"
                    />
                )}
            />
            <div className={'text-xl font-bold'}>
                :
            </div>
            <Controller
                name={'minutes'}
                control={control}
                defaultValue={0}
                render={({field}) => (
                    <Select
                        {...field}
                        options={minutesOption}
                        isSearchable={false}
                        placeholder={minutesNow.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}
                        className="w-full"
                    />
                )}
            />
        </div>
    );
};

export default TimePicker;