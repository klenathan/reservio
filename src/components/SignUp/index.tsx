"use client";
import Link from "next/link";
import Button from "../Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRef, useState, useEffect} from "react";
import axios from "axios";

import Image from "next/image";

interface SignUpForm {
    username: String;
    email: String;
    password: String;
    re_password: String;
    phone: String;
    avatar?: FileList;
}

const SignUpForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useForm<SignUpForm>();
    const [preview, setPreview] = useState<string>();

    useEffect(() => {
        let watchAvatar = watch().avatar
        if (!watchAvatar) {
            console.log("non-ava")
        } else {
            if (watchAvatar[0]) {
                updatePreview(watchAvatar[0]);
            }
        }
    }, [watch]);

    const updatePreview = (file: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
    };

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit: SubmitHandler<SignUpForm> = async data => {
        const formData = new FormData();
        formData.append("username", data.username as string);
        formData.append("email", data.email as string);
        formData.append("password", data.password as string);
        formData.append("phone", data.phone as string);
        if (data.avatar != undefined) {
            formData.append("avatar", data.avatar[0]);
        }

        const res = await axios.post(
            `https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/auth/signup`, formData
        ).then((res) => {
            // localStorage.setItem("Token", JSON.stringify(res.data))
            console.log(res)
        }).catch(e => {
            console.log(e.response)
        })
    };
    return (
        <div className="bg-white shadow rounded md:w-2/3 w-full leading-3 p-6 mt-4">
            <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
                Sign up to Reservio
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" mt-2 md:mt-1">
                <div className="w-full md:flex">
                    <div className="md:w-1/2">
                        <div>
                            <label
                                htmlFor="username"
                                className="block my-2 font-medium text-gray-900"
                            >
                                Username
                            </label>
                            <input
                                {...register("username", {required: "Username is required"})}
                                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2"
                                placeholder="e.g. Reservio"
                            />
                            {errors.username && (
                                <p className="errorMsg text-sm text-red-800">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 font-medium text-gray-900"
                            >
                                Email
                            </label>
                            <input
                                {...register("email", {required: "Email is required"})}
                                type={"email"}
                                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2"
                                placeholder="e.g. reservio@gmail.com"
                            />
                            {errors.email && (
                                <p className="errorMsg text-sm text-red-800">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                type={"password"}
                                {...register("password", {
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        message:
                                            "Password mus be minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                                    },
                                })}
                                placeholder="e.g. reservio2023"
                                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2"
                            />
                            {errors.password && (
                                <p className="errorMsg text-sm text-red-800">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 font-medium text-gray-900"
                            >
                                Retype password
                            </label>
                            <input
                                type={"password"}
                                {...register("re_password", {
                                    validate: (value) =>
                                        value === password.current || "The passwords do not match",
                                })}
                                placeholder="e.g. reservio2023"
                                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2"
                            />
                            {errors.re_password && (
                                <p className="errorMsg text-sm text-red-800">
                                    {errors.re_password.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="tel"
                                className="block mb-2 font-medium text-gray-900"
                            >
                                Phone
                            </label>
                            <input
                                type={"phone"}
                                {...register("phone", {required: "Phone is required"})}
                                placeholder="e.g. 0987654321"
                                className="bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mb-2"
                            />
                            {errors.phone && (
                                <p className="errorMsg text-sm text-red-800">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="md:w-1/2 md:ml-8">
                        <label
                            htmlFor={"file"}
                            className="block my-2 font-medium text-gray-900"
                        >
                            Avatar
                        </label>
                        <input
                            className="text-xs md:py-3 mt-2 w-48"
                            type={"file"}
                            {...register("avatar")}
                            onChange={(e) =>
                                updatePreview(e.target.files![0] as unknown as Blob)
                            }
                        />
                        {preview && (
                            <Image src={preview} alt={preview} width={200} height={200}/>
                        )}
                    </div>
                </div>

                <div className="text-center mt-4">
                    <Button btnStyle={"filled"}>Signup</Button>
                </div>

                <div className="text-center">
                    <p className="text-sm font-light text-gray-500">
                        Already have an account?{" "}
                        <Link
                            href={"/login"}
                            className="font-medium text-primary-600 hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};
export default SignUpForm;
