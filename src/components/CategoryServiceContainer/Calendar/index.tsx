import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { BsCalendar3 } from "react-icons/bs";
import { PopoverDirectionType } from "react-tailwindcss-datepicker/dist/types";
import { subDays } from "date-fns";

interface CalendarProps {
  userEndDate?: Date;
  parentCallBack?: any;
}

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
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

  // useEffect(() => {
  //   if (prevUserEndDate !== props.userEndDate) {
  //     setPrevUserEndDate(props.userEndDate);
  //     setDateRange({
  //       startDate: dateRange.startDate,
  //       endDate: props.userEndDate as Date,
  //     });
  //   }
  // }, [props.userEndDate, prevUserEndDate]);

  // useEffect(() => {
  //   props.parentCallBack(dateRange);
  // }, [dateRange]);

  return (
    <div className={" cursor-pointer border border-black py-2 px-4 space-y-4 "}>
      <Datepicker
        minDate={subDays(new Date(), 1)}
        startFrom={new Date()}
        readOnly={true}
        displayFormat={"MMM DD YYYY"}
        onChange={handleDateChange}
        showFooter={true}
        containerClassName={"relative w-full max-h"}
        inputClassName={
          "relative transition-all duration-300  w-full  text-xs placeholder-neutral-400 " +
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

export default Calendar;
