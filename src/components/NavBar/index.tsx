import Logo from "./logo";
import SearchBar from "./searchBar";
import ProfileHamBurger from "./profileHamburger";
import Modal from "../Modal";
import React, { useState } from "react";
import NewVendorForm from "../Vendor/NewVendorForm";
import { useAuth } from "../Auth/Context/AuthContext";
import { useRouter } from "next/navigation";

interface INavBarProps {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
}

const NavBar: React.FC<INavBarProps> = (props: INavBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const { isLogin, user } = useAuth();
  const { push } = useRouter();

  return (
    <div className="top-0 sticky md:static min-w-full grid grid-cols-4 place-items-center h-[5rem] border-b z-50 bg-white">
      <div className="hidden md:block">
        <Logo logoStyle="green" />
      </div>

      <div className="col-span-3 md:col-span-2 w-full flex justify-center">
        <SearchBar />
      </div>
      <div className="flex w-full justify-evenly">
        {isLogin && !user?.vendor ? (
          <div className="flex w-full justify-around">
            <button
              className="hidden md:block font-semibold hover:underline hover:text-midGreen"
              onClick={handleOpenModal}
            >
              Request New Vendor
            </button>
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                nameModal={"Create Your Own Store"}
              >
                <div className={"px-6 py-6"}>
                  <NewVendorForm />
                </div>
              </Modal>
            )}
            <ProfileHamBurger />
          </div>
        ) : (
          <ProfileHamBurger />
        )}
      </div>
    </div>
  );
};
export default NavBar;
