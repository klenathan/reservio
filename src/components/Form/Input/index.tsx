import { Controller } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type: string;
  placeholder?: string;
  errors?: any;
  rules?: any;
  control: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Input = (props: InputProps) => {
  const { name, label, type, placeholder, errors, rules, control } = props;

  return (
    <div>
      <label
        htmlFor={name}
        className={`block my-2 font-medium text-gray-900 ${
          errors && "text-red-500"
        }`}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={""}
        rules={rules}
        render={({ field }) => (
          <input
            {...field}
            autoComplete={"off"}
            type={type}
            onChange={(event) => {
              field.onChange(event);
              if (props.onChange) {
                props.onChange(event);
              }
            }}
            onBlur={() => {
              field.onBlur();
              if (props.onBlur) {
                props.onBlur();
              }
            }}
            onFocus={props.onFocus}
            placeholder={placeholder}
            className={`bg-gray-200 rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2 
                ${errors && "border-red-500 border-2 outline-none "}`}
          />
        )}
      />
      {errors && (
        <div>
          <p className="errorMsg text-sm text-red-800">{errors.message}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
