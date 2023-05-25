import apiClient from "@/config/axios.config";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../Form";
import Input from "../Form/Input";

interface IFromInput {
  description: string;
  name: string;
  address: string;
  phone?: string;
}

const NewVendorForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFromInput>();

  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData(); 
    formData.append("description", data.description as string);
    formData.append("name", data.name as string);
    formData.append("address", data.address as string);
    formData.append("phone", data.phone as string);

    apiClient
      .post("vendor", formData)
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
            name={"description"}
            label={"Description"}
            type={"text"}
            control={control}
            rules={{ required: "Description is required" }}
            errors={errors.description}
            placeholder={"e.g. Reserve it? Reservio"}
          />
          <Input
            name={"name"}
            label={"Name"}
            type={"text"}
            control={control}
            rules={{ required: "Store name is required" }}
            errors={errors.name}
            placeholder={"e.g. Reservio"}
          />
          <Input
            name={"address"}
            label={"Address"}
            type={"text"}
            control={control}
            rules={{ required: "Address is required" }}
            errors={errors.address}
            placeholder={
              "e.g. 702 Đ. Nguyễn Văn Linh, Tân Hưng, Quận 7, Thành phố Hồ Chí Minh"
            }
          />
          <Input
            name={"phone"}
            label={"Phone"}
            type={"phone"}
            control={control}
            rules={{
              pattern: {
                value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
                message:
                  "Your phone number must be Vietnamese phone and 10 digits number",
              },
            }}
            errors={errors.phone}
            placeholder={"e.g. 0987654321"}
          />
        </div>
      </Form>
    </div>
  );
};

export default NewVendorForm;
