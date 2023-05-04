import React, {useEffect, useRef, useState} from "react";
import Input from "components/Form/Input";
import {useForm} from "react-hook-form";
import Button from "components/Button";
import {useRouter} from "next/navigation";
import {format, getUnixTime} from "date-fns";
import Modal from "components/Modal";
import useFetch from "@/Helper/ClientFetch/useFetch";
import {Discount} from "../../../../Types";
import LoadingSpinner from "components/LoadingSpinner";
import DiscountCard from "components/Detail/Pricing/DiscountCard";
import usePost from "@/Helper/ClientFetch/usePost";

interface InformationProps {
    smallText: string;
    mainText?: string | number;
    children?: string | JSX.Element | JSX.Element[];
    moreStyle?: string;
}

interface TotalPriceProps {
    productId: string,
    productName: string;
    productFixedTimeSlotId?: string
    price: number;
    startTime: string | undefined;
    endTime: string | undefined;
    startDate: Date | undefined
    endDate: Date | undefined
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
)
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

    const {data, isError, isLoading} = useFetch<Discount[]>('service/discount')
    const {response, isPosting, post} = usePost(`/reservation`)

    const [isPriceValid, setIsPriceValid] = useState<boolean>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [discount, setDiscount] = useState<any>({amount: 0})

    const {push} = useRouter()


    useEffect(() => {
        if (props.price && props.price != 0) {
            setIsPriceValid(true)
        } else {
            setIsPriceValid(false)
        }
    }, [props.price])

    const handleModalOpen = () => {
        setIsModalOpen(true)
    }

    const handleDiscount = (childData: any) => {
        setDiscount(childData)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }


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
    }

    const makeReservation = async () => {
        const reservationData = new FormData()

        reservationData.append('productId', props.productId)
        props.productFixedTimeSlotId && reservationData.append("productFixedTimeSlotId", props.productFixedTimeSlotId)
        reservationData.append('quantity', quantity.current as any)
        if (!props.productFixedTimeSlotId) {
            const startAt = getUnixTime(props.startDate as any)
            const endAt = getUnixTime(props.endDate as any)
            reservationData.append('startAt', startAt as any)
            reservationData.append('endAt', endAt as any)
        }
        discount.id && reservationData.append('discountId', discount.id)
        
        try {
            await post(reservationData)
        } catch (e: any) {
            console.log(e)
        }
    }

    return (
        <div
            className={"h-full p-2 bg-yellow-100 bg-opacity-50 rounded-xl pt-5 shadow-lg "}
        >
            <div
                className={
                    "m-auto w-11/12 h-full outline outline-2 outline-black grid grid-flow-row auto-rows-max"
                }
            >
                {/*Service Name*/}
                <RowInformation
                    smallText={"Service Name"}
                    mainText={props.productName}
                />

                {/*Username*/}
                {props.userName ?
                    <RowInformation smallText={"Username"} mainText={props.userName}/> :
                    <RowInformation smallText={"Username"} mainText={"Honneyyy 😘😘😘😘"}/>}

                {/*Date*/}
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

                {/*Time*/}
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

                    {/*Quantity*/}
                    <ColInformation smallText={"Quantity"}>
                        {!props.maxQuantity ? (
                            <Input
                                name={"quantity"}
                                type={"number"}
                                min={0}
                                control={control}
                                placeholder={"1"}
                                customStyle={"w-full h-fit"}
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

                {/*Discount*/}
                <RowInformation
                    smallText={'Discount'}
                >
                    <div
                        className={'flex font-bold justify-center w-full bg-neutral-100 hover:bg-neutral-200 cursor-pointer'}
                        onClick={handleModalOpen}
                    >
                        {!discount || discount.amount == 0 ?
                            <div>Choose your discount</div> :
                            <div>{discount.id} - {discount.amount}%</div>
                        }
                    </div>

                    <Modal nameModal={'🈹 Choose your discount 🈹'} isOpen={isModalOpen} onClose={handleModalClose}>
                        {isLoading && <LoadingSpinner text={"Waiting for discount"}/>}
                        {isError && <div>Something when wrong</div>}
                        <div
                            className={'overflow-auto h-full max-h-96 space-y-4 py-6 px-1.5 md:px-6 lg:px-10 snap-both scroll-smooth'}>
                            {data &&
                                data.map((discount) => (
                                    <div key={discount.id}>
                                        <DiscountCard
                                            id={discount.id as string}
                                            name={discount.name}
                                            desc={discount.desc}
                                            amount={discount.amount}
                                            startDate={discount.start}
                                            endDate={discount.end}
                                            parentCallBack={handleDiscount}
                                            onClose={handleModalClose}
                                        />
                                    </div>
                                ))

                            }
                        </div>

                    </Modal>

                </RowInformation>

                {/*Total Price*/}
                {quantity.current ? (
                    <RowInformation
                        smallText={"Total Price"}
                        mainText={`₫${((quantity.current * props.price) * ((100 - discount?.amount) / 100)).toLocaleString()}`}
                    />
                ) : (
                    <RowInformation
                        smallText={"Total Price"}
                        mainText={`₫${props.price.toLocaleString()}`}
                    />
                )}
            </div>

            {/*Buttons*/}
            {props.isLogin ?
                <div className={"mt-2 p-3 grid grid-cols-2 gap-4 align-middle"}>
                    <Button btnStyle={"filled"}
                            disabled={!isPriceValid}
                            onClick={makeReservation}
                    >
                        Confirm
                    </Button>
                    <Button
                        btnStyle={"filled"}
                        onClick={() => {
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
