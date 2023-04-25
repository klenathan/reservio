'use client'
import NavBar from "components/NavBar";
import Head from "next/head";
import Footer from "components/Footer"


export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <section>
            <NavBar>
                <Head>
                    <title>Reservio</title>
                </Head>
            </NavBar>
            
            {children}
            <Footer></Footer>
        </section>

    )
}