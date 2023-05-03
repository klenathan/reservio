import SideBar from "@/components/Admin/sideBar";
import Head from "next/head";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Head>
        <title>Admin Panel</title>
      </Head>
      <div className="relative flex flex-row">
        <SideBar className="flex-1" />
        <div className={`flex-[5] h-screen overflow-auto`}>{children}</div>
      </div>
    </div>
  );
}
