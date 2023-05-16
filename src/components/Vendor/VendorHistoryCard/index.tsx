'use client';
import Image from 'next/image';
import Button from '../../Button';
import { useState } from 'react';
import usePut from '@/Helper/ClientFetch/usePut';
interface IVendorCardProps {
  id: string;
  userName?: string;
  status: string;
  productName: string;
  productImage: string;
  price: number;
  totalPrice: number;
  statusColor: string;
  avatar?: string;
}

const VendorVerifyCard = (props: IVendorCardProps) => {
  const formattedPrice = props.price!.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
  const [status, setStatus] = useState(props.status);

  const {
    response: acceptResponse,
    isPosting: acceptIsPosting,
    put: acceptPut,
  } = usePut(`reservation/accept/${props.id}`);

  const handleAccept = async () => {
    try {
      setStatus('accepted');
      await acceptPut();
    } catch (errors: any) {
      const errorsInfo = errors.message.response.data;
      console.log(errorsInfo);
    }
  };
  const {
    response: rejectResponse,
    isPosting: rejectIsPosting,
    put: rejectPut,
  } = usePut(`reservation/reject/${props.id}`);

  const handleReject = async () => {
    try {
      setStatus('rejected');
      await rejectPut();
    } catch (errors: any) {
      const errorsInfo = errors.message.response.data;
      console.log(errorsInfo);
    }
  };
  return (
    <div>
      {status == 'PENDING' && (
        <div className='w-full md:w-full shadow-lg mb-y-3 rounded-md m-auto'>
          <div className='relative w-full h-[15rem] rounded-t-md '>
            <Image
              src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.productImage}
              alt={props.id}
              fill
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              className='object-cover'
            />

            <div
              className={`absolute top-3 right-3 p-1 rounded-md backdrop-blu bg-[rgba(0,0,0,0.8)] status-border status-${props.statusColor}`}
            >
              <p className={`font-bold uppercase text-${props.statusColor} `}>
                {props.status}
              </p>
            </div>
          </div>
          <div className='break-words pt-1 md:p-6 md:pl-2 md:pt-1 flex flex-col justify-between  '>
            <div className='grid grid-cols-3'>
              <div className='col-span-2 flex flex-col p-2'>
                <div className='text-xl font-bold'>{props.productName}</div>
                <div className='flex flex-row items-center'>
                  <div className='relative min-w-[2rem] min-h-[2rem]'>
                    <Image
                      src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.avatar!}
                      fill
                      sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
                      alt='Profile Hamburger'
                      className='px-0 object-cover rounded-full'
                    />
                  </div>
                  <div className='font-[900] text-base md:text-xl m-2'>
                    {props.userName}
                  </div>
                </div>
              </div>
              <div className='col-span-1 grid grid-rows-2 gap-2 m-2'>
                {props.status === 'PENDING' ? (
                  <>
                    <Button
                      className='shadow hover:shadow-xl text-white bg-gradient-to-tr from-midGreen to-limeGreen py-2 px-4'
                      btnStyle='custom'
                      onClick={handleAccept}
                    >
                      Accept
                    </Button>
                    <Button
                      className='shadow hover:shadow-xl text-white bg-gradient-to-tr from-heavyRed to-lightRed py-0 px-0'
                      btnStyle='custom'
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                  </>
                ) : null}
              </div>
            </div>

            <div className='font-extrabold text-gray-600 md:text-base p-2'>
              Total:
              <span className='text-xl md:text-2xl font-extrabold text-midGreen ml-3'>
                {formattedPrice}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default VendorVerifyCard;
