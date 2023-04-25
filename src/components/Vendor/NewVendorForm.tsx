import apiClient from "@/config/axios.config";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../Form";
import Input from "../Form/Input";

interface IFromInput {
  desc?: string;
  name?: string;
  address: string;
}

const NewVendorForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFromInput>();

  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData();
    formData.append("description", data.desc as string);
    formData.append("name", data.name as string);
    formData.append("address", data.address as string);

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
            errors={errors.desc}
            placeholder={"e.g. Reserve it? Reservio"}
          />
          <Input
            name={"name"}
            label={"Name"}
            type={"text"}
            control={control}
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
        </div>
      </Form>
    </div>
  );
};

export default NewVendorForm;
