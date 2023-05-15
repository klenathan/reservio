import apiClient from "@/config/axios.config";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Form from "../Form";
import Input from "../Form/Input";

interface IFromInput {
  username: string;
  code: string;
}

const MailVerification = () => {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<IFromInput>();
  const { push } = useRouter();
  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData();
    let username = localStorage.getItem("username");
    formData.append("username", username as string);
    formData.append("code", data.code as string);

    apiClient
      .post("auth/confirmation", formData)
      .then((res) => {
        localStorage.removeItem("username");
        console.log(res);
        push("/");
      })
      .catch((e) => {
        const errorsInfo = e.response.data;
        console.log(errorsInfo);

        setError("root.serverError", {
          type: errorsInfo.errors,
          message: errorsInfo.message,
        });
      });
  };
  return (
    <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-8">
      <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
        <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
          Email Verification Form
        </h1>
        <div className="text-center mt-1">
          Please check your email to get the OTP code!
        </div>
        <div>
          <Input
            name={"code"}
            label={"Code"}
            type={"text"}
            control={control}
            rules={{ required: "Code is required" }}
          />
        </div>
        {errors.root?.serverError ? <div>errors.root?.serverError</div> : ""}
      </Form>
    </div>
  );
};

export default MailVerification;
