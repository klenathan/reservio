"use client";

interface IButtonProps {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
  btnStyle?: "filled" | "outlined";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<IButtonProps> = (props: IButtonProps) => {
  let size = " px-4 py-3 ";
  let style: {
    defaultStyle: string;
    filled: string;
    outlined: string;
  } = {
    defaultStyle: `
        transition ${size}
        rounded-lg
        font-semibold
        hover:bg-limeGreen hover:bg-opacity-20
        bg-blue
        `,
    filled: `transition ${size} bg-red
    bg-gradient-to-tr from-midGreen to-limeGreen
    rounded-lg 
    font-semibold text-white
    shadow
    hover:shadow-xl
    `,
    outlined: `transition ${size}
    rounded-lg border-2 border-solid border-oliveGreen bg-white
    font-semibold text-oliveGreen shadow
    hover:bg-limeGreen hover:bg-opacity-10 hover:shadow-lg
    `,
  };

  return (
    <button
      onClick={props.onClick}
      className={`${
        props.btnStyle ? style[props.btnStyle] : style["defaultStyle"]
      }`}
    >
      {props.children}
    </button>
  );
};
export default Button;
