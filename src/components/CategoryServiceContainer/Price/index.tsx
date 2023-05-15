import Input from "@/components/Form/Input";

const Price = (props: { control: any; minPrice: any; maxPrice: any }) => {
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
          min={1000}
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
          min={1000}
          errors={props.maxPrice}
          label=""
        />
      </div>
    </div>
  );
};

export default Price;
