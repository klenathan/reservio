import React, {useState} from 'react';
import dynamic from 'next/dynamic';
import {geocoderFunction} from '@/Helper/Geocoder';
import DetailSubtitle from 'components/Detail/DetailSubtitle';
import ImageGallery from 'components/Detail/ImageGallery/ImageGallery';
import DetailPageInfo from 'components/Detail/DetailPageInfo';
import Picture from 'components/Picture';
import {FaStar} from 'react-icons/fa';
import Loading from '@/app/(main)/detail/loading';
import {Product} from '../../../Types';
import Pricing from 'components/Detail/Pricing/Pricing';
import FloatingButtonPricing from 'components/Detail/Pricing/FloatingButtonPricing';
import {useAuth} from 'components/Auth/Context/AuthContext';

const Map = dynamic(() => import('components/Map/Map'), {ssr: false});

const DetailPage = (props: { service: Product }) => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [isError, setError] = useState<boolean>(false)
    const {user} = useAuth();

    const genGeocoder = async () => {
        return await geocoderFunction(props.service.address);
    };

    if (props.service.address) {
        genGeocoder().then((d) => {
            setLat(parseFloat(d[0].lat));
            setLng(parseFloat(d[0].lon));
        }).catch((e) => setError(true));
    }

    return (
        <div>
            <div>
                {/*Title*/}
                <h1 className='text-xl sm:text-2xl text-oliveGreen font-bold'>
                    {props.service.name}
                </h1>
                {/*Subtitle*/}
                <DetailSubtitle
                    rating={props.service.avgRating}
                    reviewCount={props.service._count?.Reservation}
                    location={props.service.address}
                    isCertified={props.service.vendor.certified}
                />

                <div className={'flex flex-col lg:flex-row w-full h-max mt-4'}>
                    <div className={'lg:w-3/4 lg:pr-4 space-y-4'}>
                        {/*Display image*/}

                        <ImageGallery images={props.service.images}/>
                        {/*Detail information*/}

                        <DetailPageInfo
                            name={props.service.name}
                            description={props.service.desc}
                            vendorName={props.service.vendor.username}
                            reviews={props.service.reviews}
                            avatar={props.service.vendor.user.avatar}
                        />
                    </div>
                    <div
                        className={
                            'hidden w-full border-2 border-neutral-10000 shadow-lg rounded-2xl h-fit lg:w-1/3 lg:block lg:sticky  lg:top-0 lg:z-10'
                        }
                    >
                        {/*Pricing*/}
                        <Pricing
                            price={props.service.price}
                            avgRating={props.service.avgRating}
                            countRating={props.service._count?.reviews}
                            productName={props.service.name}
                            type={props.service.type}
                            countReservation={props.service._count?.Reservation as number}
                            maxQuantity={props.service.quantity}
                            id={props.service.id}
                            productFixedTimeSlot={props.service.ProductFixedTimeSlot as any}
                        />
                    </div>

                    <div
                        className='fixed bottom-0 left-0 z-10 flex justify-between w-full p-5 bg-neutral-300 h-fit lg:hidden'>
                        <FloatingButtonPricing
                            price={props.service.price}
                            avgRating={props.service.avgRating}
                            countReviews={props.service._count?.reviews}
                            userName={user?.username}
                            productName={props.service.name}
                            countReservation={props.service._count?.Reservation as number}
                            maxQuantity={props.service.quantity}
                            id={props.service.id}
                            type={props.service.type}
                            productFixedTimeSlot={props.service.ProductFixedTimeSlot as any}
                        />
                    </div>
                </div>
            </div>

            {/*Map*/}
            <div className={'border-b-2 border-gray-300 w-full pb-2 space-y-7 mt-7'}>
                <div className={'text-gray-700 font-bold text-2xl mb-3'}>Direction</div>
                <div className={'relative w-full h-80 lg:w-3/4 lg:h-96 m-auto z-0'}>
                    {lat !== null && lng !== null && !isError ? (
                        <Map latitude={lat} longitude={lng} scrollWheelZoom={false}/>
                    ) : (
                        <div className={'text-2xl text-center font-bold'}>
                            Map is not found 😭😭😭😭
                        </div>
                    )}
                </div>
            </div>

            {/*Vendor preview*/}
            {props.service.vendor ? (
                <div className={'flex flex-row  space-x-4 mt-7 h-36'}>
                    <div className={'w-20 h-20 relative'}>
                        <Picture
                            src={
                                process.env.NEXT_PUBLIC_IMG_ENDPOINT +
                                props.service.vendor.user.avatar
                            }
                        />
                    </div>
                    <div className={'flex flex-col '}>
                        <div className={'text-lg font-bold'}>
                            Service by @{props.service.vendor.username}
                        </div>
                        <div>
                            Joined since{' '}
                            {new Date(props.service.vendor.createdAt).toDateString()}
                        </div>
                        <div className='inline-flex items-center'>
                            <FaStar className='mr-1'/>
                            <span>{props.service.avgRating}</span>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading/>
            )}
        </div>
    );
};

export default DetailPage;
