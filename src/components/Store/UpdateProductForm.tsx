import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "components/Form/Input";
import Button from "components/Button";
import Modal from "../Modal";
import usePut from "@/Helper/ClientFetch/usePut";
import { useAuth } from "../Auth/Context/AuthContext";
import { Product } from "../../../Types";

interface UpdateProduct {
  name: string;
  price: string;
  quantity: string;
  address: string;
  desc: string;
}

const UpdateProductForm = (props: { product: Product; display: boolean }) => {
  const { user } = useAuth();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<UpdateProduct>({
    mode: "onChange",
    defaultValues: {
      name: props.product?.name,
      address: props.product?.address,
      price: props.product.price as unknown as string,
      desc: props.product?.desc,
      quantity: props.product?.quantity as unknown as string,
    },
  });
  const { isPosting, put } = usePut(`service/${props.product.id}`);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const validatePrice = (value: string) => {
    if (parseInt(value) < 1000) {
      return "Price must be greater than or equal to 1000VND";
    }
    return true;
  };
  const validateQuantity = (value: string) => {
    if (parseInt(value) < 1) {
      return "Quantity must be greater than or equal to 1";
    }
    return true;
  };

  const onSubmit: SubmitHandler<UpdateProduct> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("price", data.price);
    formData.append("desc", data.desc);
    formData.append("quantity", data.quantity);
    try {
      await put(formData);
    } catch (errors: any) {
      console.log(errors);
    }
  };

  return (
    <>
      {props.product.vendorId === user?.id && props.display == true && (
        <div className="flex w-full pl-5 rounded-md text-xs md:text-lg">
          <Button
            btnStyle="custom"
            className="py-3 px-3 transition bg-gradient-to-tr from-midGreen to-limeGreen rounded-lg font-semibold text-white shadow hover:shadow-xl"
            onClick={handleModalOpen}
          >
            Update service
          </Button>
          <Modal
            nameModal={"Rating & Feedback"}
            isOpen={isModalOpen}
            onClose={handleModalClose}
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="my-5 md:mt-1 mx-7"
            >
              <div className="w-full">
                {/*Name*/}
                <Input
                  name={"name"}
                  label={"Name"}
                  type={"text"}
                  control={control}
                  rules={{ required: "Name is required" }}
                  errors={errors.name}
                  placeholder={"e.g. Awesome Metal Chip"}
                />
                {/*Address*/}
                <Input
                  name={"address"}
                  label={"Address"}
                  type={"text"}
                  control={control}
                  errors={errors.address}
                />
                {/*Price*/}
                <Input
                  name={"price"}
                  label={"Price"}
                  type={"number"}
                  control={control}
                  rules={{
                    required: "Price is required",
                    validate: validatePrice,
                  }}
                  errors={errors.price}
                  placeholder={"e.g. 100,000"}
                />
                {/*Quantity*/}
                <Input
                  name={"quantity"}
                  label={"Quantity"}
                  type={"number"}
                  control={control}
                  rules={{
                    required: "Quantity is required",
                    validate: validateQuantity,
                  }}
                  errors={errors.quantity}
                  placeholder={"e.g. 1"}
                />
                {/*Description*/}
                <Input
                  name={"desc"}
                  label={"Description"}
                  type={"text"}
                  control={control}
                  rules={{ required: "Description is required" }}
                  errors={errors.desc}
                  placeholder={"e.g. Awesome Metal Chip"}
                />
              </div>
              <div className="text-center mt-4">
                <Button btnStyle="filled">
                  {isPosting ? "Loading..." : "Update"}
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      )}
    </>
  );
};

export default UpdateProductForm;
