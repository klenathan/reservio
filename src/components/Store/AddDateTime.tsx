import Input from "../Form/Input";

const AddDateTime = (props: {
  control: any;
  from: any;
  to: any;
  quantity: any;
}) => {
  const validateQuantity = (value: string) => {
    if (parseInt(value) < 1) {
      return "Quantity must be greater than or equal to 1";
    }
    return true;
  };
  return (
    <div>
      <div className="flex justify-between">
        <Input
          className="mr-1"
          name={"from"}
          label={"From"}
          type={"datetime-local"}
          control={props.control}
          rules={{
            required: "Start Date is required",
          }}
          errors={props.from}
        />
        <Input
          name={"to"}
          label={"To"}
          type={"datetime-local"}
          control={props.control}
          rules={{
            required: "End Date is required",
          }}
          errors={props.to}
        />
      </div>
      <Input
        className="mr-1"
        name={"quantity"}
        label={"Quantity"}
        type={"number"}
        control={props.control}
        rules={{
          required: "Quantity is required",
          validate: validateQuantity,
        }}
        errors={props.quantity}
        placeholder={"e.g. 1"}
      />
    </div>
  );
};

export default AddDateTime;
