"use client";
import Button from "../Button";
import {useForm, SubmitHandler} from "react-hook-form";

interface IFromInput {
    username: String;
    password: String;
}

const LoginForm = () => {
    const {register, handleSubmit} = useForm<IFromInput>()
    const onSubmit: SubmitHandler<IFromInput> = async data => {
        const formData = new FormData();
        formData.append("username", data.username as string);
        formData.append("password", data.password as string);

        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        console.table(res)
        localStorage.setItem("accessToken", res.accessToken)
    }
    return (
        <div className="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
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
                        className="block mb-2 font-medium text-gray-900 "
                    >
                        Username or email
                    </label>
                    <input
                        {...register("username", {required: true})}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        className={"bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"}
                    />
                </div>
                <div>
                    <label
                        htmlFor="text"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        type={'password'}
                        {...register("password", {required: true})}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        className={"bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"}

                    />
                </div>
                <div className="text-center">
                    <Button btnStyle={"filled"}>
                        Login
                    </Button>
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
