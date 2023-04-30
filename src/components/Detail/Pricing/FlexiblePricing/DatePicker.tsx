import React, {useEffect, useRef, useState} from "react";
import {DateRange, DateRangeProps, Range} from "react-date-range";

interface DatePickerProps extends DateRangeProps {
    onDateSelect?: (range: Range[]) => void;
}

const dateNow = new Date();

// TODO FInd new component
const DatePicker: React.FC<DatePickerProps> = ({
                                                   onDateSelect,
                                                   ...datePickerProps
                                               }) => {
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: dateNow,
            endDate: dateNow,
            key: "selection"
        }
    ]);
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const startDateString = dateRange[0].startDate ? dateRange[0].startDate?.toDateString().replace(/^\S+\s/, '') : '';
    const endDateString = dateRange[0].endDate ? dateRange[0].endDate.toDateString().replace(/^\S+\s/, '') : '';

    const handleOpenCalendar = () => {
        setIsOpen(!isOpen)
    }

    const datePicker = useRef<any>()

    useEffect(() => {
        const handleCloseCalendar = () => {
            setIsOpen(false)
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleCloseCalendar()
            }
        };

        const handleClickOutside = (event: MouseEvent) => {
            if (datePicker.current && !datePicker.current?.contains(event.target as Node)) {
                handleCloseCalendar()
            }
        };
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div ref={datePicker}>
            <div
                className={'grid grid-cols-2 flex-row justify-between m-auto cursor-pointer outline outline-2 rounded-xl outline-neutral-200 hover:outline-black'}
                onClick={handleOpenCalendar}
            >
                <div className={'flex flex-col text-center border-r-2 py-2'}>
                    <div className={'font-bold'}>
                        Start Date
                    </div>
                    <div>
                        {startDateString}
                    </div>
                </div>
                <div className={'flex-col text-center  py-2'}>
                    <div className={'font-bold'}>
                        End Date
                    </div>
                    <div>
                        {endDateString}
                    </div>
                </div>

            </div>
            {isOpen &&
                <div className={'relative flex justify-center items-center border-4 border-midGreen' +
                    ' my-3 rounded-xl w-full'}>
                    <DateRange
                        editableDateInputs={true}
                        className={"rounded-lg flex"}
                        color="#59981a"
                        rangeColors={['#59981a', '#f33e5b', '#fed14c']}
                        onChange={item => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        showDateDisplay={false}
                        ranges={dateRange}
                        minDate={dateNow}
                        dragSelectionEnabled={true}
                        {...datePickerProps}
                    />
                </div>

            }

        </div>
    );
};

export default DatePicker;