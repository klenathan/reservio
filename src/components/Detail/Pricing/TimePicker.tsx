// components/TimePicker.tsx

import React, {useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import Select from 'react-select';

type TimePickerOption = {
    label: string;
    value: number;
};

interface TimePickerProps {
    startTime?: string
}

const TimePicker: React.FC<TimePickerProps> = (props: TimePickerProps) => {
    const [selectedTime, setSelectedTime] = useState<TimePickerOption | null>(null);

    const hourOption: TimePickerOption[] = Array.from({length: 24}, (_, i) => ({
        label: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
        value: i
    }))
    const minutesOption: TimePickerOption[] = Array.from({length: 60}, (_, i) => ({
        label: i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}),
        value: i
    }))

    const {
        control,
        formState: {errors},
        watch
    } = useForm({
        mode: 'onChange',
    });

    const hourChosen = useRef<TimePickerOption>()
    const minutesChosen = useRef<TimePickerOption>()

    hourChosen.current = watch('hour', '')
    minutesChosen.current = watch('minutes', '')

    console.log(hourChosen.current?.value)
    console.log(minutesChosen)

    return (
        <div className="mb-4 inline-flex items-center space-x-2">
            <Controller
                name={'hour'}
                control={control}
                render={({field}) => (
                    <Select
                        {...field}
                        options={hourOption}
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
                render={({field}) => (
                    <Select
                        {...field}
                        options={minutesOption}
                        className="w-full"
                    />
                )}
            />
        </div>
    );
};

export default TimePicker;