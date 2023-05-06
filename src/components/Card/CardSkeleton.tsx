import Skeleton from 'react-loading-skeleton';

const CardSkeleton = () => {
  return (
    <div className="flex flex-col w-full h-full shadow-xl rounded-xl my-8 transition-all border hover:bg-zinc-100">
      <Skeleton width={300} height={200} />
      <div className="flex flex-col m-5">
        <Skeleton width={100} height={20} />
        <Skeleton width={150} height={15} />
        <Skeleton width={200} height={60} />
      </div>
      <div className="flex flex-row m-5 items-center border-t">
        <Skeleton width={100} height={30} />
        <Skeleton width={70} height={20} />
      </div>
    </div>
  );
};

export default CardSkeleton;