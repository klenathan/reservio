import Button from "../Button";
import { SubmitHandler, useForm } from "react-hook-form";

interface IForm {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
  button?: string;
  onSubmit: SubmitHandler<any>;
}

const Form: React.FC<IForm> = (props: IForm) => {
  return (
    <form onSubmit={props.onSubmit} className="space-y-5 md:space-y-6">
      <div>{props.children}</div>

      <div className="text-center">
        <Button btnStyle={"filled"}>{props.button}</Button>
      </div>
    </form>
  );
};

export default Form;
