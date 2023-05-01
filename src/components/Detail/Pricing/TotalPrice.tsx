import React, {useRef} from "react";
import Input from "components/Form/Input";
import {useForm} from "react-hook-form";
import Button from "components/Button";
import {useRouter} from "next/navigation";
import {format} from "date-fns";

interface InformationProps {
    smallText: string;
    mainText?: string | number;
    children?: string | JSX.Element | JSX.Element[];
    moreStyle?: string;
}

interface TotalPriceProps {
    price: number;
    startTime: string | undefined;
    endTime: string | undefined;
    startDate: Date | undefined
    endDate: Date | undefined
    productName: string;
    userName?: string;
    maxQuantity: number
    countReservation: number;
    isLogin?: boolean
    parentCallBack?: any;
    notConfirm?: () => void
}

const RowInformation = (props: InformationProps) => (
    <div className={`${props.moreStyle} outline outline-1 outline-black p-1.5`}>
        <div className={"text-xs"}>{props.smallText}</div>
        {props.mainText && <div className={"font-bold"}>{props.mainText}</div>}
        {props.children}
    </div>
);
const ColInformation = (props: InformationProps) => (
    <div className={`${props.moreStyle} p-1.5`}>
        <div className={"text-xs"}>{props.smallText}</div>
        {props.mainText && <div className={"font-bold"}>{props.mainText}</div>}
        {props.children}
    </div>
);
const TotalPrice = (props: TotalPriceProps) => {
    const {
        control,
        watch,
        reset,
        formState: {errors},
        setValue,
        setError
    } = useForm({
        defaultValues: {
            quantity: 1,
        },
        mode: "onChange"
    });

    const {push} = useRouter()

    const quantity = useRef<number>();
    quantity.current = watch("quantity", 0);

    const availableQuantity = props.maxQuantity - props.countReservation

    let startDateString;
    let endDateString;
    if (props.startDate && props.endDate) {
        startDateString = format(props.startDate, "MMM dd yyyy")
        endDateString = format(props.endDate, "MMM dd yyyy")
    }


    const transformValue = (value: number) => {
        if (value > availableQuantity) {
            setValue('quantity', availableQuantity)
            setError('quantity', {type: 'invalid', message: `${availableQuantity} slots only 😵`})
        }

        if (value < 1) {
            setValue('quantity', 1)
        }

    }

    return (
        <div
            className={
                "h-full p-2 bg-yellow-100 bg-opacity-50 rounded-xl pt-5 shadow-lg "
            }
        >
            <div
                className={
                    "m-auto w-11/12 h-full outline outline-2 outline-black grid grid-flow-row auto-rows-max"
                }
            >
                <RowInformation
                    smallText={"Service Name"}
                    mainText={props.productName}
                />
                {props.userName ?
                    <RowInformation smallText={"Username"} mainText={props.userName}/> :
                    <RowInformation smallText={"Username"} mainText={"Honneyyy 😘😘😘😘"}/>}

                <div className={'grid grid-cols-2 outline outline-1 outline-black'}>
                    {props.startDate ?
                        <ColInformation
                            smallText={'Start date'}
                            mainText={startDateString}
                            moreStyle={"border-r-2 border-black"}
                        />
                        :
                        <ColInformation
                            smallText={'Start date'}
                            moreStyle={"border-r-2 border-black"}

                        />
                    }
                    {props.endDate ?
                        <ColInformation
                            smallText={'End date'}
                            mainText={endDateString}
                        />
                        :
                        <ColInformation smallText={"End date"}/>
                    }
                </div>


                <div className={"grid grid-cols-3 outline outline-1 outline-black"}>
                    {props.startTime ? (
                        <ColInformation
                            smallText={"Start"}
                            mainText={props.startTime}
                            moreStyle={"border-r-2 border-black"}
                        />
                    ) : (
                        <ColInformation
                            smallText={"Start"}
                            moreStyle={"border-r-2 border-black"}
                        />
                    )}

                    {props.endTime ? (
                        <ColInformation
                            smallText={"End"}
                            mainText={props.endTime}
                            moreStyle={"border-r-2 border-black"}
                        />
                    ) : (
                        <ColInformation
                            smallText={"End"}
                            moreStyle={"border-r-2 border-black"}
                        />
                    )}
                    <ColInformation smallText={"Quantity"}>
                        {!props.startTime ? (
                            <Input
                                name={"quantity"}
                                type={"number"}
                                min={0}
                                control={control}
                                placeholder={"1"}
                                customStyle={"w-full h-fit cursor-not-allowed disable"}
                                disabled={true}
                            />
                        ) : (
                            <Input
                                name={"quantity"}
                                type={"number"}
                                min={0}
                                max={availableQuantity}
                                control={control}
                                errors={errors.quantity}
                                rules={{
                                    validate: transformValue
                                }}
                                customStyle={"w-full h-fit"}
                            />
                        )}
                    </ColInformation>
                </div>
                {quantity.current ? (
                    <RowInformation
                        smallText={"Total Price"}
                        mainText={`₫${(quantity.current * props.price).toLocaleString()}`}
                    />
                ) : (
                    <RowInformation
                        smallText={"Total Price"}
                        mainText={`₫${props.price}`}
                    />
                )}
            </div>
            {props.isLogin ?
                <div className={"mt-2 p-3 grid grid-cols-2 gap-4 align-middle"}>
                    <Button btnStyle={"filled"}>Confirm</Button>
                    <Button
                        btnStyle={"filled"}
                        onClick={() => {
                            props.parentCallBack({
                                start: undefined,
                                end: undefined,
                            });
                            reset({
                                quantity: 1,
                            });
                            props.notConfirm && props.notConfirm()
                        }}
                    >
                        Cancel
                    </Button>
                </div>
                :
                <div className={"flex mt-2 p-3 justify-center"}>
                    <Button
                        btnStyle={"filled"}
                        onClick={() => push('/login')}
                    >
                        Login for book me 😘
                    </Button>
                </div>

            }

        </div>
    );
};

export default TotalPrice;
