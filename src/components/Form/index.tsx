import Button from "../Button";
import { SubmitHandler } from "react-hook-form";
import React from "react";

interface IForm {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
  button?: string;
  onSubmit: SubmitHandler<any>;
  isPosting?: boolean;
  onCancel?: () => void;
}

const Form: React.FC<IForm> = (props: IForm) => {
  return (
    <form onSubmit={props.onSubmit} className="space-y-5 md:space-y-6">
      <div>{props.children}</div>

      <div className={"flex flex-row justify-around w-full pb-2"}>
        <div className="text-center">
          <Button btnStyle={"filled"}>
            {props.isPosting ? "Loading..." : props.button}
          </Button>
        </div>
        {props.onCancel && (
          <Button btnStyle={"outlined"} onClick={props.onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default Form;
