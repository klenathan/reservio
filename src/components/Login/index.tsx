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
        formData.append("username", data.username[0]);
        formData.append("password", data.password[0]);
        const res = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
    }
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh]">
            <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-3xl text-oliveGreen font-bold uppercase text-center">
                        Login to Reservio
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 md:space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="text"
                                className="block mb-2 font-medium text-gray-900"
                            >
                                Username or email
                            </label>
                            <input
                                {...register("username", {required: true})}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                                {...register("password", {required: true})}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
            </div>
        </div>
    );
};

export default LoginForm;
