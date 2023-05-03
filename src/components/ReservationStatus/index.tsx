import Image from "next/image";
const ReservationStatus = (props: any) => {
  return (
    <div className="flex flex-col mt-10  border-b-4 border-dashed pb-3 border-gray-400">
      <h1 className="text-midGreen font-bold text-3xl md:self-end self-center">
        RESERVATION STATUS
      </h1>
      <div className="flex flex-row mt-16 justify-between">
        <div className="relative w-[2rem] h-[2rem] ">
          <Image
            src="/assets/profile.svg"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="Profile Hamburger"
            className="px-0 object-cover"
          />
        </div>
        <div className="relative w-[2rem] h-[2rem]">
          <Image
            src="/assets/profile.svg"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="Profile Hamburger"
            className="px-0 object-cover"
          />
        </div>
        <div className="relative w-[2rem] h-[2rem]">
          <Image
            src="/assets/profile.svg"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="Profile Hamburger"
            className="px-0 object-cover"
          />
        </div>
        <div className="relative w-[2rem] h-[2rem]">
          <Image
            src="/assets/profile.svg"
            fill
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
            alt="Profile Hamburger"
            className="px-0 object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default ReservationStatus;
