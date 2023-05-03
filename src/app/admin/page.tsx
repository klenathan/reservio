"use client";
import SideBar from "@/components/Admin/sideBar";
import { useAuth } from "@/components/Auth/Context/AuthContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import AdminChart from "components/Admin";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin = () => {
  const { user, isLogin } = useAuth();
  useEffect(() => {
    if (!isLogin) redirect("/");
    if (user?.admin == null) redirect("/");
  });

  return !isLogin || user?.admin == null ? (
    <div className="relative flex flex-row h-screen">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="relative flex flex-row">
      <SideBar className="flex-1" />
      <div className={`flex-[5] h-screen overflow-auto`}>
        <AdminChart />
      </div>
    </div>
  );
};

export default Admin;
