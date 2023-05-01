import Link from "next/link";
import Logo from "../NavBar/logo";

export default function SideBar(props: { className?: string }) {
  return (
    <div
      className={`${props.className} flex flex-col 
      items-center h-screen border-r`}
    >
      <div className="py-4 border-b w-full">
        <Logo logoStyle="green" />
      </div>
      <div>
        <Link href="/admin/users">Users</Link>
      </div>
    </div>
  );
}
