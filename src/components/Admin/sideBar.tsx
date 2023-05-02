import Link from "next/link";
import Logo from "../NavBar/logo";

const SideNavBtn = (props: {
  href: string;
  children?: string | JSX.Element | JSX.Element[];
}) => {
  return (
    <Link
      className="flex justify-center py-2 border-b w-full hover:bg-gray-200 cursor-pointer"
      href={props.href}
    >
      {props.children}
    </Link>
  );
};

export default function SideBar(props: { className?: string }) {
  return (
    <div
      className={`${props.className} flex flex-col 
      items-center h-screen border-r`}
    >
      <div className="py-4 border-b w-full">
        <Logo logoStyle="green" />
      </div>
      <div className="flex flex-col w-full gap-2">
        <SideNavBtn href="/admin">Home</SideNavBtn>
        <SideNavBtn href="/admin/users">Users management</SideNavBtn>
      </div>
    </div>
  );
}
