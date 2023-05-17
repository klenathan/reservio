import { categories } from "@/const/Categories";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Category } from "../../../Types";
import Form from "../Form";
import Input from "../Form/Input";
import SearchableDropdown from "../SearchableDropdown";
import AddDateTime from "./AddDateTime";
import usePost from "@/Helper/ClientFetch/usePost";
import DropZone from "components/DropZone";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface IFromInput {
  name: string;
  price: string;
  category: string;
  quantity: number;
  from: string;
  to: string;
  timeSlot: any;
  images: any;
}

const AddProduct = () => {
  const [fixTime, setFixTime] = useState({
    backgroundColor: "bg-white",
    isFieldVisible: true,
  });
  const [flexTime, setFlexTime] = useState({
    backgroundColor: "bg-slate-200",
    isFieldVisible: false,
  });
  const [moreDate, setMoreDate] = useState(0);
  const [category, setCategory] = useState<string>("");
  const { response, isPosting, post } = usePost(`service`);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<IFromInput | any>();

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

  const handleStartDate = (value: any, index: any) => {
    setValue(`from${index}`, value);
  };
  const handleEndDate = (value: any, index: any) => {
    setValue(`to${index}`, value);
  };

  useEffect(() => {
    if (fixTime.isFieldVisible) {
      setValue("type", "FIXED");
    }

    if (flexTime.isFieldVisible) {
      setValue("type", "FLEXIBLE");
    }
  }, [flexTime, fixTime, setValue]);

  const onSubmit: SubmitHandler<IFromInput | any> = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name as string);
    formData.append("price", data.price as string);
    formData.append("category", data.category as string);
    formData.append("type", data.type as string);
    formData.append(
      "timeSlot[]",
      JSON.stringify({
        from: data.fromstart as any,
        to: data.tostart as any,
        quantity: parseFloat(data.quantitystart) as number,
      })
    );

    for (let i = 0; i < moreDate; i++) {
      formData.append(
        "timeSlot",
        JSON.stringify({
          from: data[`from${i}`] as any,
          to: data[`to${i}`] as any,
          quantity: parseFloat(data[`quantity${i}`]) as number,
        })
      );
    }

    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
    }

    try {
      await post(formData);
    } catch (errors: any) {
      console.log(errors);
    }
  };

  const fixTimeHandle = () => {
    setFixTime((prevFixTime) => {
      if (prevFixTime.backgroundColor === "bg-white") {
        return { backgroundColor: "bg-slate-200", isFieldVisible: false };
      } else {
        return { backgroundColor: "bg-white", isFieldVisible: true };
      }
    });

    setFlexTime((prevFlexTime) => {
      if (prevFlexTime.backgroundColor === "bg-slate-200") {
        return { backgroundColor: "bg-white", isFieldVisible: true };
      } else {
        return { backgroundColor: "bg-slate-200", isFieldVisible: false };
      }
    });
  };

  const addMoreDate = () => {
    setMoreDate((prevState) => prevState + 1);
  };

  const fields = Array.from({ length: moreDate }, (_, i) => (
    <div key={i}>
      <AddDateTime
        control={control}
        startDate={handleStartDate}
        endDate={handleEndDate}
        quantity={errors.quantity}
        index={i}
      />
      <div className="borde w-fit p-2 rounded-md border-solid border-oliveGreen font-semibold text-oliveGreen shadow hover:bg-limeGreen hover:bg-opacity-10 hover:shadow-md">
        <input type="button" onClick={addMoreDate} value="Add More Date" />
      </div>
    </div>
  ));

  return (
    <div className="col-span-1 h-full max-h-96">
      <Form onSubmit={handleSubmit(onSubmit)} button="Submit">
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
        {/*Category*/}
        <div>
          <label className={"block my-2 font-bold text-gray-900"}>
            Category
          </label>
          <SearchableDropdown
            options={categories as unknown as Category}
            label="category"
            selectedVal={category}
            handleChange={(val: string) => {
              setCategory(val);
              setValue("category", val);
            }}
          />
        </div>

        <div className={"space-y-2"}>
          <label className="block  font-medium text-gray-900">Time</label>
          <div className="bg-slate-200 w-full flex rounded-md">
            <input
              type="button"
              name={"FIXED"}
              value="Fixed Time"
              onClick={fixTimeHandle}
              className={`w-1/2 py-1 m-[0.2rem] ease-in-out ${fixTime.backgroundColor} rounded-md`}
            />

            <input
              type="button"
              name={"FLEXIBLE"}
              value="Flex Time"
              onClick={fixTimeHandle}
              className={`w-1/2 py-1 m-[0.2rem] rounded-md ${flexTime.backgroundColor}`}
            />
          </div>
          {flexTime.isFieldVisible && (
            <div className="space-y-2">
              <Input
                className="mr-1"
                name={`quantity`}
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
            </div>
          )}
          {fixTime.isFieldVisible ? (
            <div>
              <AddDateTime
                control={control}
                startDate={handleStartDate}
                endDate={handleEndDate}
                quantity={errors.quantity}
                index={"start"}
              />
              <div className="borde w-fit p-2 rounded-md border-solid border-oliveGreen font-semibold text-oliveGreen shadow hover:bg-limeGreen hover:bg-opacity-10 hover:shadow-md">
                <input
                  type="button"
                  onClick={addMoreDate}
                  value="Add More Date"
                />
              </div>
              <div>{fields}</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Controller
          name="images"
          control={control}
          defaultValue={[]}
          rules={{
            required: "Image is required",
          }}
          render={({ field: { onChange } }) => (
            <div className="my-2">
              <DropZone
                multiple={true}
                onChange={(files: any) => onChange(files)}
                avatar={false}
                classname="md:grid-cols-3"
              >
                <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload className="text-xl" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                  </div>
                </label>
              </DropZone>
              {errors.images && typeof errors.images.message === "string" && (
                <p className="text-red-500">{errors.images.message}</p>
              )}
            </div>
          )}
        />
      </Form>
    </div>
  );
};

export default AddProduct;
