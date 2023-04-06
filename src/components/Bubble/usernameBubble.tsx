import React from 'react';

interface BubbleWrapProps {
    length: boolean;
    noConsecutiveSpecialChars: boolean;
    noStartEndSpecialChars: boolean;
}

const BubbleWrap: React.FC<BubbleWrapProps> = (props: BubbleWrapProps) => {
    return (
        <div className="absolute top-full left-0 rounded-lg shadow-lg p-4 w-full bg-gray-100">
            <h2 className={"text-sm md:text-base font-bold italic"}>Username requirement</h2>
            <ul className="list-disc list-inside leading-7">
                <li className={`${props.length ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    Length between 8 and 20 characters: {props.length ? '✅' : '❌'}
                </li>
                <li className={`${props.noConsecutiveSpecialChars ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    No consecutive special characters: {props.noConsecutiveSpecialChars ? '✅' : '❌'}
                </li>
                <li className={`${props.noStartEndSpecialChars ? 'text-green-500' : 'text-red-500'} text-sm md:text-base`}>
                    No special characters at start or end: {props.noStartEndSpecialChars ? '✅' : '❌'}
                </li>
            </ul>
        </div>
    );
};

export default BubbleWrap;