"use client";
import Link from "next/link";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useRef, useState} from "react";
import DropZone from "components/DropZone";
import {useRouter} from "next/navigation";
import Input from "components/Form/Input";
import UsernameBubble from "components/Auth/SignUp/Bubble/usernameBubble";
import PasswordBubbleWrap from "components/Auth/SignUp/Bubble/passwordBubble";
import Button from "components/Button";
import usePost from "@/Helper/ClientFetch/usePost";

interface SignUpForm {
    username: String;
    email: String;
    password: String;
    re_password: String;
    phone: String;
    avatar?: File[];
}

const SignUpForm = () => {
    const {
        handleSubmit,
        formState: {errors},
        setError,
        watch,
        control,
    } = useForm<SignUpForm>({mode: "onBlur"});

    const [usernameValidation, setUsernameValidation] = useState({
        length: false,
        noConsecutiveSpecialChars: false,
        noStartEndSpecialChars: false,
    });

    const [passwordState, setPasswordState] = useState({
        hasLength: false,
        hasLowercase: false,
        hasUppercase: false,
        hasDigit: false,
    });

    const [inputFocused, setInputFocused] = useState({
        username: false,
        password: false,
    });

    const {response, isPosting, post} = usePost(`auth/signup`)

    const {push} = useRouter();

    const password = useRef<String>();
    const username = useRef<String>();
    const email = useRef<String>();

    password.current = watch("password", "");
    email.current = watch("email", "");
    username.current = watch("username", "");

    const handleUsernameChange = () => {
        const value = username.current;
        if (typeof value === "string") {
            setUsernameValidation({
                length: /^(?=[a-zA-Z0-9._]{8,20}$)/.test(value),
                noConsecutiveSpecialChars: /^(?!.*[_.]{2})/.test(value),
                noStartEndSpecialChars: /^[^_.].*[^_.]$/.test(value),
            });
        }
    };

    function handlePasswordChange() {
        const newPassword = password.current;
        if (typeof newPassword === "string") {
            setPasswordState({
                hasLength: newPassword.length >= 8,
                hasLowercase: /[a-z]/.test(newPassword),
                hasUppercase: /[A-Z]/.test(newPassword),
                hasDigit: /\d/.test(newPassword),
            });
        }
    }

    const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
        const formData = new FormData();

        formData.append("username", data.username as string);
        formData.append("email", data.email as string);
        formData.append("password", data.password as string);
        formData.append("phone", data.phone as string);
        if (data.avatar != undefined) {
            formData.append("avatar", data.avatar as any);
        }

        try {
            await post(formData)
        } catch (errors: any) {
            console.log(errors)
            const errorInfo = errors.message.response.data;

            if (errorInfo.error == "UNIQUE_CONSTRAIN_VIOLATED" && errorInfo.message.includes("username")) {
                setError("username", {
                    type: errorInfo.error,
                    message: "Username is used",
                });
            }

            if (errorInfo.error == "UNIQUE_CONSTRAIN_VIOLATED" && errorInfo.message.includes("email")) {
                setError("email", {
                    type: errorInfo.error,
                    message: "Email is used",
                });
            }
        }
    }

    return (
        <div className="bg-white shadow rounded md:w-2/3 w-full leading-3 p-6 mt-4">
            <h1 className="focus:outline-none text-2xl font-extrabold leading-6 text-oliveGreen uppercase text-center ">
                Sign up to Reservio
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className=" mt-2 md:mt-1">
                <div className="w-full md:flex">
                    <div className="md:w-1/2">
                        <div className={"relative"}>
                            <Input
                                name={"username"}
                                label={"Username"}
                                type={"text"}
                                placeholder={"e.g. Reservio"}
                                errors={errors.username}
                                control={control}
                                rules={{
                                    required: "Username is required",
                                    pattern: {
                                        value:
                                            /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                                        message: "Invalid username",
                                    },
                                }}
                                onChange={handleUsernameChange}
                                onFocus={() =>
                                    setInputFocused({username: true, password: false})
                                }
                                onBlur={() =>
                                    setInputFocused({username: false, password: false})
                                }
                            />
                            {inputFocused.username && (
                                <UsernameBubble {...usernameValidation} />
                            )}
                        </div>

                        <Input
                            name={"email"}
                            label={"Email"}
                            control={control}
                            rules={{
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email",
                                },
                            }}
                            type={"email"}
                            placeholder={"e.g. reservio@reservio.com"}
                            errors={errors.email}
                        />
                        <div className={"relative"}>
                            <Input
                                name={"password"}
                                label={"Password"}
                                type={"password"}
                                control={control}
                                rules={{
                                    required: "Password is required",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                        message:
                                            "Password mus be minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                                    },
                                }}
                                errors={errors.password}
                                onChange={handlePasswordChange}
                                onFocus={() =>
                                    setInputFocused({username: false, password: true})
                                }
                                onBlur={() =>
                                    setInputFocused({username: false, password: false})
                                }
                            />
                            {inputFocused.password && (
                                <PasswordBubbleWrap {...passwordState} />
                            )}
                        </div>

                        <Input
                            name={"re_password"}
                            type={"password"}
                            label={"Retype password"}
                            control={control}
                            rules={{
                                validate: (value: String) =>
                                    value === password.current || "The passwords do not match",
                            }}
                            errors={errors.re_password}
                        />
                        <Input
                            name={"phone"}
                            type={"phone"}
                            label={"Phone"}
                            control={control}
                            rules={{
                                required: "Phone is required",
                                pattern: {
                                    value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
                                    message:
                                        "Your phone number must be Vietnamese phone and 10 digits number",
                                },
                            }}
                            placeholder={"e.g. 0987654321"}
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
                        <Controller
                            name={"avatar"}
                            control={control}
                            defaultValue={[]}
                            render={({field: {onChange}}) => (
                                <DropZone
                                    multiple={false}
                                    onChange={(files: any) => onChange(files[0])}
                                    avatar={true}
                                />
                            )}
                        />
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
    );
}
export default SignUpForm;
