import apiClient from "@/config/axios.config";
import { categories } from "@/const/Categories";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Category } from "../../../Types";
import Form from "../Form";
import Input from "../Form/Input";
import SearchableDropdown from "../SearchableDropdown";

interface IFromInput {
  name: string;
  price: string;
  category: string;
  quantity: string;
}

const AddProduct = () => {
  const [value, setValue] = useState<string>("");
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFromInput>();

  const validateQuantity = (value: string) => {
    if (parseInt(value) < 1) {
      return "Quantity must be greater than or equal to 1";
    }
    return true;
  };

  const validatePrice = (value: string) => {
    if (parseInt(value) < 1000) {
      return "Price must be greater than or equal to 1000VND";
    }
    return true;
  };
  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name as string);
    formData.append("price", data.price as string);
    formData.append("category", value as string);
    formData.append("quantity", value as string);
    apiClient
      .post("service", formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        const errorsInfo = e.response.data;
        console.log(errorsInfo.error);
      });
  };
  return (
    <div className="col-span-1">
      <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
        <div>
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
          <Input
            name={"quantity"}
            label={"Quantity"}
            type={"number"}
            control={control}
            rules={{
              required: "Quantity is required",
              validate: validateQuantity,
            }}
            errors={errors.quantity}
            placeholder={"e.g. 100"}
          />
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
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
