"use client";
import NavBar from "components/NavBar";
import React from "react";
import Footer from "components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#FAF9F6]">
      <NavBar />
      <div className="min-h-screen pb-4">{children}</div>
      <Footer />
    </div>
  );
}
