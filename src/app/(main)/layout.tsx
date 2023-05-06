'use client'
import NavBar from "components/NavBar";
import React from "react";


export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    // className="flex h-screen flex-col"
    return (
        <div className="relative">
            <NavBar/>
            {/*<Suspense fallback={<Loading/>}>*/}
            {children}

            {/*</Suspense>*/}
            {/*<Footer/>*/}
        </div>

    )
}