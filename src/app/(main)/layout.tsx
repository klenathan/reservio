'use client'
import NavBar from "components/NavBar";
import React from "react";
import Footer from "components/Footer";


export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative">
            <NavBar/>
            {children}

            <Footer/>
        </div>

    )
}