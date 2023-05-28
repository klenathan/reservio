import Input from '../Form/Input';
import TimePicker from 'components/Detail/Pricing/FlexiblePricing/TimePicker';
import React, {useEffect, useState} from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import {getUnixTime, set, subDays} from 'date-fns';
import {PopoverDirectionType} from 'react-tailwindcss-datepicker/dist/types';
import {BsCalendar3} from 'react-icons/bs';

interface addingDateProps {
    handleDateChange: any;
    name: string;
    dateRange: any;
    handleTimeCallBack: any;
}

interface addDateTimeProps {
    control: any;
    quantity: any;
    startDate: any;
    endDate: any;
    index: number | string;
    isQuantity : boolean;
}

const AddingDate = (props: addingDateProps) => {
    return (
        <div className={'flex flex-col space-y-2'}>
            <div className={'font-medium'}>{props.name} Date</div>
            <div className={'flex flex-col md:flex-row justify-around'}>
                <Datepicker
                    minDate={subDays(new Date(), 1)}
                    startFrom={new Date()}
                    readOnly={true}
                    displayFormat={'MMM DD YYYY'}
                    asSingle={true}
                    useRange={false}
                    onChange={props.handleDateChange}
                    // showFooter={true}
                    containerClassName={
                        'relative w-full md:w-96 border border-limeGreen rounded-lg max-h'
                    }
                    inputClassName={
                        'relative transition-all duration-300 py-2.5 pl-2 pr-10 w-full h-full rounded-lg text-sm placeholder-neutral-400 outline-none focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-lime-800 focus:ring-lime-500/20'

                    }
                    value={props.dateRange}
                    primaryColor={'lime'}
                    popoverDirection={'down' as PopoverDirectionType}
                    toggleIcon={() => <BsCalendar3/>}
                />
                <div className={'space-y-2'}>
                    <div className={'md:hidden font-medium'}>{props.name} Time</div>
                    <TimePicker
                        name={props.name}
                        parentCallBack={props.handleTimeCallBack}
                    />
                </div>
            </div>
        </div>
    );
};

const AddDateTime = (props: addDateTimeProps) => {
    const [endTime, setEndTime] = useState<any>();
    const [startTime, setStartTime] = useState<any>();
    const [dateStart, setDateStart] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const [dateEnd, setDateEnd] = useState({
        startDate: new Date(),
        endDate: new Date(),
    });
    const validateQuantity = (value: string) => {
        if (parseInt(value) < 1) {
            return 'Quantity must be greater than or equal to 1';
        }
        return true;
    };

    const handleTimeCallBack = (childTime: any) => {
        if (childTime.name == 'Start') {
            setStartTime(childTime);
        } else {
            setEndTime(childTime);
        }
    };

    const handleDateStart = (date: any) => {
        setDateStart(date);
    };
    const handleDateEnd = (date: any) => {
        setDateEnd(date);
    };

    useEffect(() => {
        let date;
        if (dateStart && startTime) {
            date = getUnixTime(
                set(new Date(dateStart.startDate), {
                    hours: startTime.hour,
                    minutes: startTime.minutes,
                })
            );
        }
        props.startDate(date, props.index);
    }, [dateStart, startTime]);

    useEffect(() => {
        let date;
        if (dateEnd && endTime) {
            date = getUnixTime(
                set(new Date(dateEnd.startDate), {
                    hours: endTime.hour,
                    minutes: endTime.minutes,
                })
            );
        }
        props.endDate(date, props.index);
    }, [dateEnd, endTime]);
    return (
        <div
            className='flex flex-col my-2  justify-between space-y-3 border-2 border-neutral-300 shadow-md rounded-lg py-4 px-6'>
            {/*Start Date*/}
            <AddingDate
                handleDateChange={handleDateStart}
                name={'Start'}
                dateRange={dateStart}
                handleTimeCallBack={handleTimeCallBack}
            />
            {/*End Date*/}
            <AddingDate
                handleDateChange={handleDateEnd}
                name={'End'}
                dateRange={dateEnd}
                handleTimeCallBack={handleTimeCallBack}
            />
            {/*Quantity*/}
            {props.isQuantity && <Input
                className='mr-1'
                name={`quantity${props.index}`}
                label={'Quantity'}
                type={'number'}
                control={props.control}
                rules={{
                    required: 'Quantity is required',
                    validate: validateQuantity,
                }}
                errors={props.quantity}
                placeholder={'e.g. 1'}
            />}

        </div>
    );
};

export default AddDateTime;
