"use client";
import Button from "../Button";
import {useForm, SubmitHandler} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/navigation";
import Input from "components/Input";

interface IFromInput {
    username: String;
    password: String;
}

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors},
        control
    } = useForm<IFromInput>();
    const {push} = useRouter();
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
                const errorsInfo = e.response.data
                let message: string

                console.log(errorsInfo.error)

                if (errorsInfo.error == "NotFoundError") {
                    message = "User not founded"
                } else if (errorsInfo.error == "WRONG_CREDENTIAL") {
                    message = "Wrong password"
                } else {
                    message = errorsInfo.error
                }

                setError("root.serverError", {
                    type: errorsInfo.errors,
                    message: message,
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
                    <Input
                        name={"username"}
                        label={"Username"}
                        type={"text"}
                        control={control}
                        rules={{required: "Username is required"}}
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
