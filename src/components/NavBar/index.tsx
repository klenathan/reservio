import Logo from "./logo";
import SearchBar from "./searchBar";
import ProfileHamBurger from "./profileHamburger";

interface INavBarProps {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
}

const NavBar: React.FC<INavBarProps> = (props: INavBarProps) => {
  return (
    <div
      className="fixed md:static min-w-full grid grid-cols-4 md:grid-cols-3 place-items-center h-[5rem] 
    shadow-md z-50 bg-white  "
    >
      <Logo logoStyle="green" />
      <SearchBar />
      <ProfileHamBurger />
    </div>
  );
};
export default NavBar;
