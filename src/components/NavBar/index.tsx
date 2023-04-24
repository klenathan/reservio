import Logo from "./logo";
import SearchBar from "./searchBar";
import ProfileHamBurger from "./profileHamburger";
import Modal from "../Modal";
import { useState } from "react";
import NewVendorForm from "../Vendor/NewVendorForm";

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

  return (
    <div
      className="top-0 fixed md:static min-w-full grid grid-cols-4 md:grid-cols-5 place-items-center h-[5rem] 
    shadow-md z-50 bg-white"
    >
      <Logo logoStyle="green" />
      <SearchBar />
      <button onClick={handleOpenModal}>Request New Vendor</button>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          nameModal={"Create Your Own Store"}
        >
          <NewVendorForm />
        </Modal>
      )}
      <ProfileHamBurger />
    </div>
  );
};
export default NavBar;
