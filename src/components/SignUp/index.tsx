"use client";
import Link from "next/link";
import Button from "../Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRef} from "react";
import axios from "axios";
import DropZone from "components/DropZone";
import Input from "components/Input";

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
    } = useForm<SignUpForm>({mode: "onChange"});

    const password = useRef({});
    const username = useRef<String>()
    const email = useRef<String>()

    password.current = watch("password", "");
    email.current = watch("email", "")
    username.current = watch("username", "")


    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        const formData = new FormData();
        formData.append("username", data.username as string);
        formData.append("email", data.email as string);
        formData.append("password", data.password as string);
        formData.append("phone", data.phone as string);
        if (data.avatar != undefined) {
            formData.append("avatar", data.avatar[0]);
        }

        const res = await axios
            .post(
                `https://06ufwajgc6.execute-api.ap-southeast-1.amazonaws.com/auth/signup`,
                formData
            )
            .then((res) => {
                // localStorage.setItem("Token", JSON.stringify(res.data))
                console.log(res);
            })
            .catch((e) => {
                console.log(e.response);
            });
    };

    return (
        <div className="bg-white shadow rounded md:w-2/3 w-full leading-3 p-6 mt-4">
            <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
                Sign up to Reservio
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" mt-2 md:mt-1">
                <div className="w-full md:flex">
                    <div className="md:w-1/2">
                        <Input
                            name={"username"}
                            label={"Username"}
                            type={"text"}
                            register={register}
                            validator={{required: "Username is required"}}
                            placeholder={"e.g. Reservio"}
                            errors={errors.username}
                        />
                        <Input
                            name={"email"}
                            label={"Email"}
                            register={register}
                            validator={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message:
                                        "Invalid email",
                                }
                        }}
                            type={"email"}
                            placeholder={"e.g. reservio@reservio.com"}
                            errors={errors.email}
                        />
                        <Input
                            name={"password"}
                            label={"Password"}
                            type={"password"}
                            register={register}
                            validator={{
                                required: "Password is required",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                    message:
                                        "Password mus be minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                                }
                            }}
                            errors={errors.password}
                        />
                        <Input
                            name={"re_password"}
                            type={"password"}
                            label={"Retype password"}
                            register={register}
                            validator={{
                                validate: (value: String) =>
                                    value === password.current || "The passwords do not match",
                            }}
                            errors={errors.re_password}
                        />
                        <Input
                            name={"phone"}
                            type={"phone"}
                            label={"Phone"}
                            register={register}
                            placeholder={"e.g. 0987654321"}
                            validator={{
                                required: "Phone is required",
                                pattern: {
                                    value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
                                    message:
                                        "Your phone number must be Vietnamese phone and 10 digits number",
                                }
                            }}
                            errors={errors.phone}
                        />
                    </div>

                    <div className="md:w-1/2 text-center">
                        <label
                            htmlFor={"file"}
                            className="block my-5 font-medium md: text-lg text-gray-900"
                        >
                            Choose your avatar
                        </label>
                        <p className={"py-2"}>Drag an image here or upload a file</p>
                        <DropZone/>
                        <div className={"w-full mt-4 space-y-3"}>
                            <h2 className={"font-bold"}>
                                @{username.current ? username.current : "Reservio"}
                            </h2>
                            <h3 className={"font-thin"}>
                                {email.current ? email.current : "reservio@reservio.com"}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <Button btnStyle="filled">Signup</Button>
                </div>
            </form>


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
        </div>
    )
        ;
};
export default SignUpForm;
