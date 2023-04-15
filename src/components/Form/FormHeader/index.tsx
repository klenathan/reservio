interface IFormHeader {
  name: string;
}
const FormHeader: React.FC<IFormHeader> = (props: IFormHeader) => {
  return (
    <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
      {props.name}
    </h1>
  );
};

export default FormHeader;
