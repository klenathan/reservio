import Logo from "./logo";
import SearchBar from "./searchBar";
import ProfileHamBurger from "./profileHamburger";

interface INavBarProps {
  children?: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[];
}

const NavBarSkeleton: React.FC<INavBarProps> = (props: INavBarProps) => {
  return (
    <div
      className="grid grid-cols-3 place-items-center h-[5rem] 
    shadow-md w-full bg-slate-50 dark:bg-oliveGreen animate-pulse"
    ></div>
  );
};
export default NavBarSkeleton;
