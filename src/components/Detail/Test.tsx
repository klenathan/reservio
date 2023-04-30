import {useState} from "react";
import Datepicker from "react-tailwindcss-datepicker";

const Test = () => {
    const [value, setValue] = useState({
        startDate: null,
        endDate: null
    });

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    return (
        <Datepicker
            value={value}
            onChange={handleValueChange}
            showShortcuts={true}
        />
    );
}

export default Test