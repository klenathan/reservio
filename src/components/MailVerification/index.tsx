import {useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import Form from "../Form";
import Input from "../Form/Input";
import usePost from "@/Helper/ClientFetch/usePost";

interface IFromInput {
    username: string;
    code: string;
}

const MailVerification = () => {
    const {
        handleSubmit,
        control,
        setError,
        formState: {errors},
    } = useForm<IFromInput>();
    const {push} = useRouter();
    const {response, isPosting, post} = usePost(`auth/confirmation`);

    useEffect(() => {
        if (response != undefined) {
            push("/login");
        }
    }, [push, response]);
    const onSubmit: SubmitHandler<IFromInput> = async (data) => {
        const formData = new FormData();
        let username = localStorage.getItem("username");
        formData.append("username", username as string);
        formData.append("code", data.code as string);
        try {
            await post(formData);
            localStorage.setItem("username", data.username as string);

            push("/verify");
        } catch (errors: any) {
            const errorInfo = errors.message.response.data;

            if (
                errorInfo.error == 'WRONG_CONFIRMATION_CODE' &&
                errorInfo.message.includes("code")
            ) {
                setError("code", {
                    type: errorInfo.error,
                    message: "Wrong confirmation code",
                });
            }
        }
    }


    return (
        <div className="bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-8">
            <Form onSubmit={handleSubmit(onSubmit)} button="Submit" isPosting={isPosting}>
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
                        errors={errors.code}
                        type={"text"}
                        control={control}
                        rules={{required: "Code is required"}}
                    />
                </div>
            </Form>
        </div>
    );
};

export default MailVerification;
