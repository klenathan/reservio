import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAuth } from "components/Auth/Context/AuthContext";
import Picture from "components/Picture";

interface IHamburgerMenuChildProps {
  children: JSX.Element | JSX.Element[] | string;
  href?: string;
  onClick?: () => void;
}

const HamburgerMenuChild: React.FC<IHamburgerMenuChildProps> = (
  props: IHamburgerMenuChildProps
) => {
  if (!props.href) {
    return (
      <Link
        prefetch={false}
        href={"/"}
        className={`hover:bg-limeGreen hover:bg-opacity-20 
      first:rounded-t-xl last:rounded-b-xl
    py-2 px-2`}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    );
  } else {
    return (
      <Link
        href={{ pathname: props.href }}
        className={`hover:bg-limeGreen hover:bg-opacity-20 
      first:rounded-t-xl last:rounded-b-xl
    py-2 px-2`}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    );
  }
};

interface IHamburgerMenuProps {
  show: boolean;
  logout?: () => void;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const NavBarHamburgerMenu: React.FC<IHamburgerMenuProps> = (
  props: IHamburgerMenuProps
) => {
  useEffect(() => {
    const handleClick = (e: any) => {
      props.setShow(false);
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });

  const { isLogin, user } = useAuth();

  return (
    <div
      className={`absolute ${props.show ? "flex" : "hidden"} flex-col top-12 
        rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]
        w-40 gap-3 
        left-1/2 transform -translate-x-1/2
        bg-white z-10
    `}
    >
      {isLogin ? (
        <>
          <HamburgerMenuChild href="/userprofile">
            My Profile
          </HamburgerMenuChild>
          {user?.vendor ? (
            <>
              <HamburgerMenuChild href="/vendorprofile">
                Vendor Profile
              </HamburgerMenuChild>
              <HamburgerMenuChild
                href={`/store/${encodeURIComponent(user.username)}`}
              >
                Your Store
              </HamburgerMenuChild>
            </>
          ) : (
            ""
          )}

          {props.logout && (
            <HamburgerMenuChild onClick={props.logout}>
              Logout
            </HamburgerMenuChild>
          )}
        </>
      ) : (
        <>
          <HamburgerMenuChild href="/login">Login</HamburgerMenuChild>
          <HamburgerMenuChild href="/signup">Sign Up</HamburgerMenuChild>
        </>
      )}
    </div>
  );
};

export default function ProfileHamBurger() {
  const { user, logout } = useAuth();

  const [show, setShow] = useState(false);
  const toggleHamburgerMenu = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <div
      onClick={() => {
        toggleHamburgerMenu();
      }}
      className="transition relative
     flex flex-row items-center border-2 border-solid 
    border-gray-300 rounded-3xl px-2 py-1 gap-3
    shadow-sm bg-white
    hover:shadow hover:border-oliveGreen col-span-1"
    >
      <GiHamburgerMenu className="h-8" />
      {!user ? (
        <CgProfile className="h-6 w-6" />
      ) : (
        <div
          className={"relative w-8 h-8 border-2 rounded-full border-gray-400 "}
        >
          <Picture src={process.env.NEXT_PUBLIC_IMG_ENDPOINT + user.avatar} />
        </div>
      )}
      <NavBarHamburgerMenu logout={logout} show={show} setShow={setShow} />
    </div>
  );
}
