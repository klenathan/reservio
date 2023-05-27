"use client";
import Link from "next/link";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import DropZone from "components/DropZone";
import { useRouter } from "next/navigation";
import Input from "components/Form/Input";
import UsernameBubble from "components/Auth/SignUp/Bubble/usernameBubble";
import Button from "components/Button";
import Modal from "../Modal";
import usePut from "@/Helper/ClientFetch/usePut";
import { useAuth } from "../Auth/Context/AuthContext";

interface UpdateProfile {
  username: String;
  email: String;
  phone: String;
  avatar?: File[];
}

const UpdateProfileForm = () => {
  const { user } = useAuth();
  const { setUser } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    control,
  } = useForm<UpdateProfile>({
    mode: "onChange",
    defaultValues: {
      username: user?.username,
      email: user?.email,
      phone: user?.phoneNo,
    },
  });
  const { response, isPosting, put } = usePut(`user`);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const { push } = useRouter();

  useEffect(() => {
    if (response != undefined) {
      sessionStorage.setItem("accessToken", response.accessToken);
      sessionStorage.setItem("userData", JSON.stringify(response.user));
      localStorage.setItem("refreshToken", response.refreshToken);
      setUser(response.user);
      push("/");
    }
  }, [push, response, setUser]);

  const [usernameValidation, setUsernameValidation] = useState({
    length: false,
    noSpecialChars: false,
  });

  const [inputFocused, setInputFocused] = useState({
    username: false,
    password: false,
  });

  const username = useRef<String>();
  const email = useRef<String>();
  const firstName = useRef<String>();

  email.current = watch("email", "");
  username.current = watch("username", "");

  const handleUsernameChange = () => {
    const value = watch("username", "");
    if (typeof value === "string") {
      setUsernameValidation({
        length: /^.{8,20}$/.test(value),
        noSpecialChars: /^[a-zA-Z0-9_]*$/.test(value),
      });
    }
  };

  const onSubmit: SubmitHandler<UpdateProfile> = async (data) => {
    const formData = new FormData();

    formData.append("username", data.username as string);
    formData.append("email", data.email as string);
    formData.append("phoneNo", data.phone as string);
    if (data.avatar != undefined) {
      formData.append("avatar", data.avatar as any);
    }

    try {
      await put(formData);
    } catch (errors: any) {
      const errorInfo = errors.message.response.data;

      if (
        errorInfo.error == "UNIQUE_CONSTRAIN_VIOLATED" &&
        errorInfo.message.includes("username")
      ) {
        setError("username", {
          type: errorInfo.error,
          message: "Username is used",
        });
      }

      if (
        errorInfo.error == "UNIQUE_CONSTRAIN_VIOLATED" &&
        errorInfo.message.includes("email")
      ) {
        setError("email", {
          type: errorInfo.error,
          message: "Email is used",
        });
      }
    }
  };

  return (
    <div className="flex w-full shadow-xl rounded-md text-xs md:text-lg">
      <Button btnStyle="filled" onClick={handleModalOpen}>
        Update profile
      </Button>
      <Modal
        nameModal={"Rating & Feedback"}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <form onSubmit={handleSubmit(onSubmit)} className=" my-5 md:mt-1 mx-7">
          <div className="w-full md:flex">
            <div className="w-full">
              <div className={"relative"}>
                <Input
                  name={"username"}
                  label={"Username"}
                  type={"text"}
                  placeholder={"e.g. Reservio"}
                  errors={errors.username}
                  control={control}
                  rules={{
                    pattern: {
                      value: /^([a-zA-Z0-9_]){8,20}$/,
                      message: "Invalid username",
                    },
                  }}
                  onChange={handleUsernameChange}
                  onFocus={() =>
                    setInputFocused({ username: true, password: false })
                  }
                  onBlur={() =>
                    setInputFocused({ username: false, password: false })
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
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email",
                  },
                }}
                type={"email"}
                placeholder={"e.g. reservio@reservio.com"}
                errors={errors.email}
              />

              <Input
                name={"phone"}
                type={"phone"}
                label={"Phone"}
                control={control}
                rules={{
                  pattern: {
                    value: /^(84|0[3|5|7|8|9])+([0-9]{8})\b$/,
                    message:
                      "Your phone number must be Vietnamese 10-digit number",
                  },
                }}
                errors={errors.phone}
              />
            </div>
          </div>
          <div className="text-center mt-4">
            <Button btnStyle="filled">
              {isPosting ? "Loading..." : "Update"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UpdateProfileForm;
