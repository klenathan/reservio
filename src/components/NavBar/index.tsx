import Logo from "./logo";
import SearchBar from "./searchBar";
import ProfileHamBurger from "./profileHamburger";
import Modal from "../Modal";
import React, {useState} from "react";
import NewVendorForm from "../Vendor/NewVendorForm";
import {useAuth} from "../Auth/Context/AuthContext";
import {useRouter} from "next/navigation";

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
    const {isLogin, user} = useAuth();
    const {push} = useRouter();

    return (
        <div
            className="top-0 sticky md:static min-w-full grid grid-cols-4 md:grid-cols-5 place-items-center h-[5rem]
    shadow-md z-50 bg-white"
        >
            <Logo logoStyle="green"/>
            <SearchBar/>

            {isLogin && !user?.vendor ? (
                <>
                    <button onClick={handleOpenModal}>Request New Vendor</button>
                    {isModalOpen && (
                        <Modal
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            nameModal={"Create Your Own Store"}
                        >
                            <div className={'px-6 py-6'}>
                                <NewVendorForm/>
                            </div>
                        </Modal>
                    )}
                </>
            ) : (
                ""
            )}

            <ProfileHamBurger/>
        </div>
    );
};
export default NavBar;
