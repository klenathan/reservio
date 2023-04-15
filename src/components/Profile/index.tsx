import Image from "next/image";
import Link from "next/link";


const UserProfile = (props: any) => {
  const size = 100;
  return (
    <div className="flex flex-col pr-12">
      <div className="relative self-center ">
        <Image
          priority
          src="/assets/profile.svg"
          height={size}
          width={size}
          alt="Profile Hamburger"
        />
      </div>

      <div className="">
        <div>Username: Habui </div>
        <div>Email: habui@gmail.com</div>
        <div>Phone: 0708417087 </div>
      </div>
    </div>
  );
};

export default UserProfile;
