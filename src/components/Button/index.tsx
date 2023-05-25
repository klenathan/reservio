'use client';

import React from 'react';

interface IButtonProps {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
  btnStyle?: 'filled' | 'outlined' | 'custom';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  let size = ' px-4 py-3 ';
  let style: {
    defaultStyle: string;
    filled: string;
    outlined: string;
    custom: string;
  } = {
    defaultStyle: `
        ${props.disabled && 'disabled cursor-not-allowed'}
        transition ${size}
        rounded-lg
        font-semibold
        hover:bg-limeGreen hover:bg-opacity-20
        `,
    filled: `transition ${size} bg-red
        ${props.disabled == true && 'disabled cursor-not-allowed'}
    bg-gradient-to-tr from-midGreen to-limeGreen
    rounded-lg 
    font-semibold text-white
    shadow
    hover:shadow-xl
    `,
    outlined: `transition ${size}
        ${props.disabled && 'disabled cursor-not-allowed'}
    rounded-lg border-2 border-solid border-oliveGreen bg-white
    font-semibold text-oliveGreen shadow
    hover:bg-limeGreen hover:bg-opacity-10 hover:shadow-lg
    `,
    custom: 'transition rounded-lg font-semibold ',
  };

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${
        props.btnStyle
          ? props.btnStyle == 'custom' && props.className
            ? (style[props.btnStyle] += props.className)
            : style[props.btnStyle]
          : style['defaultStyle']
      }`}
    >
      {props.children}
    </button>
  );
};
export default Button;
