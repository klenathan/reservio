import React, {useState} from "react";
import {DateRange, DateRangeProps, Range} from "react-date-range";

interface DatePickerProps extends DateRangeProps {
    onDateSelect?: (range: Range[]) => void;
}

const dateNow = new Date();

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


    return (
        <div>
            <div>
                <div>
                    Start Date
                </div>
                <div>
                    {startDateString}
                </div>
                <div>
                    End Date
                </div>
                <div>
                    {endDateString}
                </div>
            </div>
            <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                showDateDisplay={false}
                ranges={dateRange}
                minDate={dateNow}
                dragSelectionEnabled={true}

                {...datePickerProps}
            />
        </div>
    );
};

export default DatePicker;