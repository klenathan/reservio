import React from 'react';

interface PasswordBubbleWrapProps {
    hasLength: boolean,
    hasLowercase: boolean,
    hasUppercase: boolean,
    hasDigit: boolean,
}

const PasswordBubbleWrap: React.FC<PasswordBubbleWrapProps> = (props: PasswordBubbleWrapProps) => {
    return (
        <div className="absolute top-full left-0 rounded-lg shadow-lg p-4 w-full bg-gray-100">
            <h2 className={"text-sm md:text-base font-bold italic"}>Username requirement</h2>
            <ul className="list-disc list-inside leading-7">
                <li className={`${props.hasLength ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    At least 8 characters: {props.hasLength ? '✅' : '❌'}
                </li>
                <li className={`${props.hasLowercase ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    At least one lowercase letter: {props.hasLowercase ? '✅' : '❌'}
                </li>
                <li className={`${props.hasUppercase ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    At least one uppercase letter: {props.hasUppercase ? '✅' : '❌'}
                </li>
                <li className={`${props.hasDigit ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    At least one digit: {props.hasDigit ? '✅' : '❌'}
                </li>
            </ul>
        </div>
    );
};

export default PasswordBubbleWrap;