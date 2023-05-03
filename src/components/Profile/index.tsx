import Image from "next/image";
interface IUserProfileProps {
  userName: string;
  email: string;
  phone: number;
}
const UserProfile = (props: IUserProfileProps) => {
  const size = 100;

  return (
    <div className="flex flex-row md:flex-col  items-center md:border-2 p-4  md:bg-white md:drop-shadow-md">
      <div className="relative self-center ">
        <div className="relative w-[5rem] h-[5rem] ">
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

      <div className="">
        <div className="font-semibold text-midGreen">
          <span className="font-bold text-black"> Username: </span>Habui{" "}
          {props.userName}
        </div>
        <div className="font-semibold text-midGreen">
          <span className="font-bold text-black">Email: </span> @@@@@@@@@@
          {props.email}
        </div>
        <div className="font-semibold text-midGreen">
          <span className="font-bold text-black">Phone: </span> 0708417087{" "}
          {props.phone}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
