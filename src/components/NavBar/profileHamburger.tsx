
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import React, { useState } from "react";
import { useAuth } from "components/Auth/Context/AuthContext";
import Picture from "components/Picture";
import NavBarHamburgerMenu from "./ProfileHamburgerComponents/NavBarHamburgerMenu";

export default function ProfileHamBurger() {
  const { user, logout, isLogin } = useAuth();

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
      <NavBarHamburgerMenu isLogin={isLogin} user={user} logout={logout} show={show} setShow={setShow} />
    </div>
  );
}
