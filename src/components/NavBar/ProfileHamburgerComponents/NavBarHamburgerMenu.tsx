import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { User } from "../../../../Types";

interface IHamburgerMenuChildProps {
  children: JSX.Element | JSX.Element[] | string;
  className?: string;
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
        className={`${props.className} hover:bg-limeGreen hover:bg-opacity-20 
      first:rounded-t-xl last:rounded-b-xl
    py-3 px-2`}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    );
  } else {
    return (
      <Link
        href={{ pathname: props.href }}
        className={`${props.className} hover:bg-limeGreen hover:bg-opacity-20 
      first:rounded-t-xl last:rounded-b-xl
    py-3 px-2`}
        onClick={props.onClick}
      >
        {props.children}
      </Link>
    );
  }
};

interface IHamburgerMenuProps {
  show: boolean;
  isLogin: boolean;
  user: User | null;
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

  return (
    <div
      className={`absolute ${props.show ? "flex" : "hidden"} flex-col top-12 
          rounded-xl shadow-[0_0px_20px_0px_rgba(0,0,0,0.2)]
          w-40
          left-1/2 transform -translate-x-1/2
          bg-white z-10
      `}
    >
      {props.isLogin ? (
        <>
          <HamburgerMenuChild href={`/userprofile/`}>
            My Profile
          </HamburgerMenuChild>
          {props.user?.vendor && (
            <>
              <HamburgerMenuChild href={`/vendorprofile`}>
                Vendor Profile
              </HamburgerMenuChild>
              <HamburgerMenuChild
                className="border-b-2"
                href={`/store/${encodeURIComponent(
                  props.user?.username as string
                )}`}
              >
                My Store
              </HamburgerMenuChild>
            </>
          )}

          {props.user?.admin && (
            <HamburgerMenuChild className="border-b-2" href={`/admin`}>
              Admin Panel
            </HamburgerMenuChild>
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

export default NavBarHamburgerMenu;
