import React, {useState} from "react";


const DatePicker: React.FC = () => {
    const dateNow = new Date();

    const [state, setState] = useState([
        {
            startDate: dateNow,
            endDate: null,
            key: "selection"
        }
    ]);

    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (ranges: any) => {
        setState([ranges.selection]);
        setIsOpen(false);
    };

    const toggleCalendar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <div onClick={toggleCalendar}>
                {state[0].startDate.toLocaleDateString()} -{" "}
                {/*{state[0].endDate?.toLocaleDateString() || "Select Date"}*/}
            </div>

            {/*{isOpen && (*/}
            {/*    <Calendar*/}
            {/*        date={state[0].startDate}*/}
            {/*        onChange={(date) =>*/}
            {/*            setState([{...state[0], startDate: date, endDate: null}])*/}
            {/*        }*/}
            {/*        onRangeFocusChange={() => {*/}
            {/*        }}*/}
            {/*        // onShown={() => {*/}
            {/*        // }}*/}
            {/*        onHidden={() => setIsOpen(false)}*/}
            {/*    />*/}
            {/*)}*/}


        </div>
    );
};

export default DatePicker;