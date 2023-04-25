import React, {useRef} from "react";
import Input from "components/Form/Input";
import {useForm} from "react-hook-form";
import Button from "components/Button";

interface InformationProps {
    smallText: string
    mainText?: string | number
    children?: string | JSX.Element | JSX.Element[]
    moreStyle?: string
}

interface TotalPriceProps {
    price: number
    start: string | undefined
    end: string | undefined
    productName: string
    userName: string
    parentCallBack?: any
}

const RowInformation = (props: InformationProps) => (
    <div className={`${props.moreStyle} outline outline-1 outline-black p-1.5`}>
        <div className={'text-xs'}>{props.smallText}</div>
        {props.mainText && <div className={'font-bold'}>{props.mainText}</div>}
        {props.children}
    </div>
)
const ColInformation = (props: InformationProps) => (
    <div className={`${props.moreStyle} p-1.5`}>
        <div className={'text-xs'}>{props.smallText}</div>
        {props.mainText && <div className={'font-bold'}>{props.mainText}</div>}
        {props.children}
    </div>
)
const TotalPrice = (props: TotalPriceProps) => {
    const {
        control,
        watch,
        reset
    } = useForm({
        defaultValues: {
            quantity: 1
        }
    })


    const quantity = useRef<number>();
    quantity.current = watch("quantity", 0);

    console.log(props.start)


    return (
        <div className={'h-fit p-2 bg-yellow-100 bg-opacity-50 rounded-xl pt-5 shadow-lg '}>
            <div className={'m-auto w-11/12 h-full outline outline-2 outline-black grid grid-rows-4 '}>
                <RowInformation smallText={"Service Name"} mainText={props.productName}/>
                <RowInformation smallText={'Username'} mainText={props.userName}/>
                <div className={'grid grid-cols-3 outline outline-1 outline-black'}>
                    {props.start ?
                        <ColInformation
                            smallText={'Start'}
                            mainText={props.start}
                            moreStyle={'border-r-2 border-black'}/>
                        :
                        <ColInformation
                            smallText={'Start'}
                            moreStyle={'border-r-2 border-black'}
                        />
                    }

                    {
                        props.end ?
                            <ColInformation
                                smallText={"End"}
                                mainText={props.end}
                                moreStyle={'border-r-2 border-black'}
                            />
                            :
                            <ColInformation
                                smallText={"End"}
                                moreStyle={'border-r-2 border-black'}
                            />
                    }
                    <ColInformation smallText={"Quantity"}>
                        {(!props.start) ?
                            <Input
                                name={'quantity'}
                                type={'number'}
                                min={0}
                                control={control}
                                placeholder={"1"}
                                customStyle={"w-full h-fit cursor-not-allowed disable"}
                                disabled={true}
                            /> :
                            <Input
                                name={'quantity'}
                                type={'number'}
                                min={0}
                                control={control}
                                customStyle={"w-full h-fit"}
                            />
                        }

                    </ColInformation>
                </div>
                {quantity.current ?
                    <RowInformation smallText={"Total Price"} mainText={`₫${quantity.current * props.price}`}/> :
                    <RowInformation smallText={"Total Price"} mainText={`₫${props.price}`}/>
                }
            </div>
            <div className={'mt-2 p-3 grid grid-cols-2 gap-4 align-middle'}>
                <Button btnStyle={"filled"}>
                    Confirm
                </Button>
                <Button
                    btnStyle={"filled"}
                    onClick={() => {
                        props.parentCallBack({
                            start: undefined,
                            end: undefined,
                        })
                        reset({
                            'quantity': 1
                        })
                    }}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}

export default TotalPrice;