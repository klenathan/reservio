import Image from 'next/image';
import { User } from '../../../Types';

const UserProfile = (props: { user: User }) => {
  return (
    <div className='flex flex-row md:flex-col justify-center 
    rounded-lg
    items-center md:border p-2 pt-3 m-2 md:shadow'>
      <div className='relative w-[5rem] h-[5rem] '>
        <Image
          src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + props.user.avatar}
          fill
          sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          alt='Profile Hamburger'
          className='px-0 object-cover rounded-full'
        />
      </div>
      <div className='m-2 '>
        <div className='font-semibold text-midGreen'>
          <span className='font-bold text-black'> Username: </span>
          {props.user.username}
        </div>
        <div className='font-semibold text-midGreen'>
          <span className='font-bold text-black '>Email: </span>
          {props.user.email}
        </div>
        <div className='font-semibold text-midGreen'>
          <span className='font-bold text-black '>Phone: </span>
          {props.user.phoneNo}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
