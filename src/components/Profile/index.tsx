import Image from "next/image";
import Link from "next/link";


const UserProfile = () => {
  const size = 100;
  return (
    <div className="flex flex-col justify-center w-1/6 ">
      <div className="relative self-center ">
        <Image
          priority
          src="/assets/profile.svg"
          height={size}
          width={size}
          alt="Profile Hamburger"
        />
      </div>

      <div className="pl-8">
        <div>Username: Habui </div>
        <div>Email: habui@gmail.com</div>
        <div>Phone: 0708417087 </div>
      </div>
    </div>
  );
};

export default UserProfile;
