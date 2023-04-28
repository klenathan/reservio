import apiClient from "@/config/axios.config";
import { categories } from "@/const/Categories";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "../../../Types";
import Form from "../Form";
import Input from "../Form/Input";
import SearchableDropdown from "../SearchableDropdown";
import AddDateTime from "./AddDateTime";

interface IFromInput {
  name: string;
  price: string;
  category: string;
  quantity: string;
  from: string;
  to: string;
}

const AddProduct = () => {
  const [value, setValue] = useState<string>("");
  const [fixTime, setFixTime] = useState({
    backgroundColor: "bg-white",
    isFieldVisible: true,
  });
  const [flexTime, setFlexTime] = useState({
    backgroundColor: "bg-slate-200",
    isFieldVisible: false,
  });
  const [moreDate, setMoreDate] = useState(0);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFromInput>();

  const validatePrice = (value: string) => {
    if (parseInt(value) < 1000) {
      return "Price must be greater than or equal to 1000VND";
    }
    return true;
  };
  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData();
    console.log(data);
    console.log(value);
    formData.append("name", data.name as string);
    formData.append("price", data.price as string);
    formData.append("category", data.category as string);
    formData.append("quantity", value as string);
    console.log(formData);

    // apiClient
    //   .post("service", formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((e) => {
    //     const errorsInfo = e.response.data;
    //     console.log(errorsInfo.error);
    //   });
  };

  const fixTimeHandle = () => {
    setFixTime((prevFixTime) => {
      if (prevFixTime.backgroundColor === "bg-white") {
        return { backgroundColor: "bg-slate-200", isFieldVisible: false };
      } else {
        return { backgroundColor: "bg-white", isFieldVisible: true };
      }
    });

    setFlexTime((prevFlexTime) => {
      if (prevFlexTime.backgroundColor === "bg-slate-200") {
        return { backgroundColor: "bg-white", isFieldVisible: true };
      } else {
        return { backgroundColor: "bg-slate-200", isFieldVisible: false };
      }
    });
  };

  const addMoreDate = () => {
    setMoreDate((prevState) => prevState + 1);
  };

  const fields = Array.from({ length: moreDate }, (_, i) => (
    <div key={i}>
      <AddDateTime
        control={control}
        from={errors.from}
        to={errors.to}
        quantity={errors.quantity}
      />
      <div className="borde w-fit p-2 rounded-md border-solid border-oliveGreen font-semibold text-oliveGreen shadow hover:bg-limeGreen hover:bg-opacity-10 hover:shadow-md">
        <input type="button" onClick={addMoreDate} value="Add More Date" />
      </div>
    </div>
  ));

  return (
    <div className="col-span-1 overflow-auto scroll-auto h-full max-h-96">
      <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
        <Input
          name={"name"}
          label={"Name"}
          type={"text"}
          control={control}
          rules={{ required: "Name is required" }}
          errors={errors.name}
          placeholder={"e.g. Awesome Metal Chip"}
        />
        <Input
          name={"price"}
          label={"Price"}
          type={"number"}
          control={control}
          rules={{
            required: "Price is required",
            validate: validatePrice,
          }}
          errors={errors.price}
          placeholder={"e.g. 100,000"}
        />
        <label className="block my-2 font-medium text-gray-900">Time</label>
        <div className="bg-slate-200 w-full flex rounded-md">
          <input
            type="button"
            value="Fixed Time"
            onClick={fixTimeHandle}
            className={`w-1/2 py-1 m-[0.2rem] ease-in-out ${fixTime.backgroundColor} rounded-md`}
          />

          <input
            type="button"
            value="Flex Time"
            onClick={fixTimeHandle}
            className={`w-1/2 py-1 m-[0.2rem] rounded-md ${flexTime.backgroundColor}`}
          />
        </div>
        <AddDateTime
          control={control}
          from={errors.from}
          to={errors.to}
          quantity={errors.quantity}
        />

        {fixTime.isFieldVisible ? (
          <div>
            <div className="borde w-fit p-2 rounded-md border-solid border-oliveGreen font-semibold text-oliveGreen shadow hover:bg-limeGreen hover:bg-opacity-10 hover:shadow-md">
              <input
                type="button"
                onClick={addMoreDate}
                value="Add More Date"
              />
            </div>
            <div>{fields}</div>
          </div>
        ) : (
          ""
        )}

        <div>
          <label className={"block my-2 font-medium text-gray-900"}>
            Category
          </label>
          <SearchableDropdown
            options={categories as unknown as Category}
            label="category"
            selectedVal={value}
            handleChange={(val: string) => setValue(val)}
          />
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
