import React, {InputHTMLAttributes} from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    type: string;
    placeholder?: string;
    errors?: any;
    register?: any;
    validator?: any;
}

const Input: React.FC<InputProps> = (props: InputProps, ...rest) => {
    return (
        <div>
            <label
                htmlFor={props.name}
                className="block my-2 font-medium text-gray-900"
            >
                {props.label}
            </label>
            <input
                type={props.type}
                {...props.register(props.name, props.validator)}
                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2"
                placeholder={props.placeholder}
            />
            {props.errors && (
                <p className="errorMsg text-sm text-red-800">
                    {props.errors.message}
                </p>
            )}
        </div>
    )

}

export default Input;