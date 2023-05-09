import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";

type TimePickerOption = {
  label: string;
  value: number;
};

type TimeSelected = {
  name?: string;
  hour?: number;
  minutes?: number;
};

interface TimePickerProps {
  name?: string;
  parentCallBack?: any;
}

const TimePicker: React.FC<TimePickerProps> = (props: TimePickerProps) => {
  const { control } = useForm();

  const dateNow = new Date();
  let hourNow = dateNow.getHours();
  let minutesNow: number;

  if (0 < dateNow.getMinutes() && dateNow.getMinutes() < 30) {
    minutesNow = 30;
  } else if (dateNow.getMinutes() >= 30 && dateNow.getMinutes() < 60) {
    hourNow++;
    minutesNow = 0;
  } else {
    minutesNow = 0;
  }

  const [selectedTime, setSelectedTime] = useState<TimeSelected | null>({
    name: props.name,
    hour: hourNow,
    minutes: minutesNow,
  });

  const hourOption: TimePickerOption[] = Array.from({ length: 24 }, (_, i) => ({
    label: i.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    value: i,
  }));
  const minutesOption: TimePickerOption[] = Array.from([0, 30], (i) => ({
    label: i.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }),
    value: i,
  }));

  useEffect(() => {
    if (selectedTime) {
      props.parentCallBack(selectedTime);
    }
  }, [selectedTime, props.parentCallBack, props]);

  return (
    <div className="inline-flex items-center space-x-2">
      <Controller
        name={"hour"}
        control={control}
        defaultValue={hourNow}
        render={({ field }) => (
          <Select
            {...field}
            isSearchable={false}
            options={hourOption}
            placeholder={hourNow.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            className="w-full"
            value={hourOption.find(
              (option) => option.value === selectedTime?.hour
            )}
            onChange={(e) => {
              setSelectedTime({
                name: props.name,
                hour: e?.value,
                minutes: selectedTime?.minutes,
              });
            }}
          />
        )}
      />
      <div className={"text-xl font-bold"}>:</div>
      <Controller
        name={"minutes"}
        control={control}
        defaultValue={minutesNow}
        render={({ field }) => (
          <Select
            {...field}
            options={minutesOption}
            isSearchable={false}
            placeholder={minutesNow.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
            className="w-full"
            value={minutesOption.find(
              (option) => option.value === selectedTime?.minutes
            )}
            onChange={(e) =>
              setSelectedTime({
                name: props.name,
                hour: selectedTime?.hour,
                minutes: e?.value,
              })
            }
          />
        )}
      />
    </div>
  );
};

export default TimePicker;
