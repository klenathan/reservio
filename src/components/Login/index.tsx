"use client";
import Button from "../Button";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFromInput {
  username: String;
  password: String;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFromInput>();
  const { push } = useRouter();
  const onSubmit: SubmitHandler<IFromInput> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username as string);
    formData.append("password", data.password as string);

    const res = await axios
      .post(
        `https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/auth/login`,
        formData
      )
      .then((res) => {
        localStorage.setItem("Token", JSON.stringify(res.data));
        push("/");
      })
      .catch((e) => {
        console.log(e.response);
        setError("root.serverError", {
          type: e.status,
          message: e.response.data.message,
        });
      });
  };

  return (
    <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-8">
      <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
        Login to Reservio
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 md:space-y-6"
      >
        <div>
          <label
            htmlFor="text"
            className="block my-2 font-medium text-gray-900 "
          >
            Username or email
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            className={
              "bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            }
          />
          {errors.username && (
            <p className="errorMsg text-sm text-red-800">
              {errors.username.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="text"
            className="block mb-2 font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type={"password"}
            {...register("password", { required: "Password is required" })}
            className={
              "bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
            }
          />
          {errors.root?.serverError && (
            <p className="errorMsg text-sm text-red-800">
              {errors.root?.serverError.message}
            </p>
          )}
        </div>

        <div className="text-center">
          <Button btnStyle={"filled"}>Login</Button>
        </div>
      </form>
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
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline"
        >
          Forgot password?
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
