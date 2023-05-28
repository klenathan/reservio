import React, { useEffect, useState } from "react";
import Form from "../Form";
import Input from "../Form/Input";
import usePost from "@/Helper/ClientFetch/usePost";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropZone from "../DropZone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import AddDateTime from "../Store/AddDateTime";
import FormHeader from "../Form/FormHeader";
import VoucherGrid from "./voucherGrid";
import { useRouter } from "next/navigation";
import { useAuth } from "../Auth/Context/AuthContext";
import { log } from "console";
interface IFromInput {
  name: string;
  desc: string;
  quantity: string;
  image: number;
  start: string;
  end: string;
}

const CreateVoucher = () => {
  const { response, isPosting, post } = usePost(`service/discount`);
  const [update, isUpdate] = useState<boolean>(false);

  const { user, isLogin, isLoading } = useAuth();
  const { push } = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isLogin) push("/login");
      if (user && user?.admin == null) push("/");
    }
  }, [isLoading]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IFromInput | any>();

  const handleStartDate = (value: any, index: any) => {
    setValue(`from${index}`, value);
  };
  const handleEndDate = (value: any, index: any) => {
    setValue(`to${index}`, value);
  };
  const onSubmit: SubmitHandler<IFromInput | any> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name as string);
    formData.append("desc", data.desc as string);
    formData.append("image", data.image[0] as string);
    formData.append("start", data.fromstart as string);
    formData.append("end", data.tostart as string);
    formData.append("amount", data.amount as string);
    try {
      await post(formData);
      isUpdate(true);
      reset();
    } catch (errors: any) {
      console.log(errors);
    }
  };

  return (
    <div className="col-span-1 h-full p-8">
      <FormHeader name={"Create New Voucher"} />
      <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
        {/*Name*/}
        <Input
          name={"name"}
          label={"Name"}
          type={"text"}
          control={control}
          rules={{ required: "Name is required" }}
          errors={errors.name}
          placeholder={"e.g. Awesome Metal Chip"}
        />
        {/*Desc*/}
        <Input
          name={"desc"}
          label={"Description"}
          type={"text"}
          control={control}
          rules={{
            required: "Description is required",
          }}
          errors={errors.desc}
        />
        <AddDateTime
          control={control}
          startDate={handleStartDate}
          endDate={handleEndDate}
          quantity={errors.quantity}
          index={"start"}
          isQuantity={false}
        />
        <Input
          name={"amount"}
          label={"Discount percentage"}
          type={"number"}
          control={control}
          rules={{
            required: "Discount is required",
          }}
          errors={errors.amount}
        />

        <label className="block my-2 font-medium text-gray-900" htmlFor="image">
          Image
        </label>
        <Controller
          name="image"
          control={control}
          defaultValue={[]}
          rules={{
            required: "Image is required",
          }}
          render={({ field: { onChange } }) => (
            <div className="my-2 text-center">
              <DropZone
                multiple={false}
                onChange={(files: any) => onChange(files)}
                avatar={false}
              >
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload className="text-xl" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                </label>
              </DropZone>
              {errors.image && typeof errors.image.message === "string" && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
          )}
        />
      </Form>

      <VoucherGrid />

      {/* <TopDealContainer /> */}
    </div>
  );
};

export default CreateVoucher;
