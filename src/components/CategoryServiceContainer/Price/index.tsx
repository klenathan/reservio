import Input from "@/components/Form/Input";

const Price = (props: { control: any; minPrice: any; maxPrice: any }) => {
  const validatePrice = (value: string) => {
    if (parseInt(value) < 1000) {
      return "Price must be greater than or equal to 1000VND";
    }
    return true;
  };

  return (
    <div className="flex">
      <div className="flex">
        <div className="underline h-full border-y border-l border-black p-1">
          đ
        </div>

        <Input
          customStyle={
            "outline-none leading-normal text-base border-y border-r border-black cursor-default w-full p-1"
          }
          name="minPrice"
          type="number"
          control={props.control}
          rules={{
            validate: validatePrice,
          }}
          errors={props.minPrice}
          label=""
        />
      </div>
      <div className="mx-1">-</div>
      <div className="flex">
        <div className="underline h-full border-y border-l border-black p-1">
          đ
        </div>
        <Input
          customStyle={
            "outline-none leading-normal text-base border-y border-r border-black cursor-default w-full p-1"
          }
          name="maxPrice"
          type="number"
          control={props.control}
          rules={{
            validate: validatePrice,
          }}
          errors={props.maxPrice}
          label=""
        />
      </div>
    </div>
  );
};

export default Price;
