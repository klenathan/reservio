"use client";
import Link from "next/link";
import Button from "../Button";
import {SubmitHandler, useForm} from "react-hook-form";

interface SignUpForm {
    username: String;
    email: String;
    password: String;
    phone: String;
}

const SignUpForm = () => {
    const {register, handleSubmit} = useForm<SignUpForm>()
    const onSubmit: SubmitHandler<SignUpForm> = async data => {
        const formData = new FormData();
        formData.append("username", data.username as string);
        formData.append("email", data.email as string);
        formData.append("password", data.password as string);
        formData.append("phone", data.phone as string);

        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        console.table(res)
        localStorage.setItem("accessToken", res.accessToken)
    }
    return (
        <div className="bg-white shadow rounded  lg:w-1/3  md:w-1/2 w-full leading-3 p-10 mt-3">
            <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
                Sign up to Reservio
            </h1>
            <form
                className="space-y-4 md:space-y-6"
                action="#"
            >
                <div>
                    <label
                        htmlFor="username"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Username
                    </label>
                    <input
                        {...register("username", {required: true})}
                        className={"bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="e.g. Reservio"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Email
                    </label>
                    <input
                        {...register("email", {required: true})}
                        className={"bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="e.g. reservio@gmail.com"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Password
                    </label>
                    <input
                        {...register("password", {required: true})}
                        placeholder="e.g. reservio2023"
                        className={"bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required={true}
                    />
                </div>

                <div>
                    <label
                        htmlFor="tel"
                        className="block mb-2 font-medium text-gray-900"
                    >
                        Phone
                    </label>
                    <input
                        type="phone"
                        name="phone"
                        id="phone"
                        placeholder="e.g. 0987654321"
                        className={"bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"}
                        // className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required={true}
                    />
                </div>

                <div className="text-center">
                    <Button
                        btnStyle="filled"
                        onClick={() => {
                            console.log("Clicked");
                        }}
                    >
                        Sign in
                    </Button>
                </div>

                <div className="text-center">
                    <p className="text-sm font-light text-gray-500 mb-2">
                        Don’t have an account yet?{" "}
                        <Link
                            href={"/signup"}
                            className="font-medium text-primary-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                    <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline"
                    >
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>

    );
};

export default SignUpForm;
