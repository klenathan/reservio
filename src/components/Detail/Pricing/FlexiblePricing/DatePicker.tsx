import React, {useEffect, useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";
import {BsCalendar3} from "react-icons/bs";
import {PopoverDirectionType} from "react-tailwindcss-datepicker/dist/types";
import {subDays} from "date-fns";

interface DatePickerProps {
  userEndDate?: Date;
  parentCallBack?: any;
}

const DatePicker: React.FC<DatePickerProps> = (props: DatePickerProps) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: props.userEndDate as Date,
  });
  const [prevUserEndDate, setPrevUserEndDate] = useState(props.userEndDate);
  const [isDateRangeUpdated, setIsDateRangeUpdated] = useState(false);

  const handleDateChange = (newValue: any) => {
    setDateRange({
      startDate: new Date(newValue.startDate),
      endDate: new Date(newValue.endDate),
    });
    setIsDateRangeUpdated(true);
  };

  useEffect(() => {
    if (isDateRangeUpdated) {
      setPrevUserEndDate(dateRange.endDate);
      setIsDateRangeUpdated(false);
    }
  }, [isDateRangeUpdated, dateRange.endDate]);

  useEffect(() => {
    if (prevUserEndDate !== props.userEndDate) {
      setPrevUserEndDate(props.userEndDate);
      setDateRange({
        startDate: dateRange.startDate,
        endDate: props.userEndDate as Date,
      });
    }
  }, [props.userEndDate, prevUserEndDate, dateRange.startDate]);

  useEffect(() => {
    props.parentCallBack(dateRange);
  }, [dateRange, props]);

  return (
    <div className={" cursor-pointer outline outline-2 rounded-xl outline-neutral-200 py-2 px-4 space-y-4 "}>
      <div className={"font-bold"}>Choose your date:</div>
      <Datepicker
        minDate={subDays(new Date(), 1)}
        startFrom={new Date()}
        readOnly={true}
        displayFormat={"MMM DD YYYY"}
        onChange={handleDateChange}
        showFooter={true}
        containerClassName={"relative w-full border border-limeGreen rounded-lg max-h"}
        inputClassName={
          "relative transition-all duration-300 py-2.5 pl-2 pr-10 w-full rounded-lg text-sm placeholder-neutral-400 " +
          "focus:ring disabled:opacity-40 disabled:cursor-not-allowed focus:border-lime-500 focus:ring-lime-500/20"
        }
        value={dateRange}
        primaryColor={"lime"}
        popoverDirection={"down" as PopoverDirectionType}
        toggleIcon={() => <BsCalendar3 />}
      />
    </div>
  );
};

export default DatePicker;