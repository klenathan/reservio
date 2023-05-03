import SideBar from "@/components/Admin/sideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-row">
      <div className="flex-1 bg-gray-200 " />
      <div className={`flex-[5] h-screen overflow-auto`}>{children}</div>
    </div>
  );
}
