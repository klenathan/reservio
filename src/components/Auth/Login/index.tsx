"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { redirect, useRouter } from "next/navigation";
import Input from "@/components/Form/Input";
import Form from "../../Form";
import FormHeader from "../../Form/FormHeader";
import { useAuth } from "components/Auth/Context/AuthContext";
import { useEffect } from "react";
import usePost from "@/Helper/ClientFetch/usePost";
import LoadingSpinner from "@/components/LoadingSpinner";

interface IFromInput {
  username: String;
  password: String;
}

const LoginForm = () => {
  const {
    handleSubmit,
    setError,
    formState: { errors },
    control,
  } = useForm<IFromInput>();

  const { push } = useRouter();

  const { isLogin, setUser, login, isLoading } = useAuth();

  const { response, isPosting, post } = usePost(`auth/login`);

  useEffect(() => {
    if (isLogin) {
      redirect("/");
    }
  });

  useEffect(() => {
    if (response != undefined) {
      sessionStorage.setItem("accessToken", response.accessToken);
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.user);
      login();
      push("/");
    }
  }, [login, push, response, setUser]);

  if (isLoading) {
    return (
      <div className="my-4">
        <LoadingSpinner />
      </div>
    );
  }

  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username as string);
    formData.append("password", data.password as string);

    try {
      await post(formData);
    } catch (errors: any) {
      const errorsInfo = errors.message.response.data;
      let message: string;

      if (
        errorsInfo.error == "NoFoundError" ||
        errorsInfo.message == "No User found"
      ) {
        message = "User not found";
      } else if (errorsInfo.error == "WRONG_CREDENTIAL") {
        message = "Wrong password";
      } else {
        message = errorsInfo.error;
      }

      setError("root.serverError", {
        type: errorsInfo.errors,
        message: message,
      });
    }
  };

  return (
    <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-8">
      <FormHeader name="Login to Reservio" />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        isPosting={isPosting}
        button="Login"
      >
        <div>
          <Input
            name={"username"}
            label={"Username"}
            type={"text"}
            control={control}
            rules={{ required: "Username is required" }}
            placeholder={"e.g. Reservio"}
            errors={errors.username}
          />
          <Input
            name={"password"}
            label={"Password"}
            type={"password"}
            control={control}
            errors={errors.root?.serverError}
          />
        </div>
      </Form>
      <div className="text-center">
        <p className="text-sm font-light text-gray-500 mb-2">
          Don’t have an account yet?{" "}
          <a
            href={"/signup"}
            className="font-medium text-primary-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
