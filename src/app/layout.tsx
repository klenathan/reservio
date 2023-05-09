import "./globals.css";
import {AuthProvider} from "components/Auth/Context/AuthContext";
import {ReactNode} from "react";
import Head from "next/head";

export const metadata = {
    title: "Reservio",
    description: "Reserve it? Reservio",
    icons: {
        icon: "/Reservio-logo-square-2.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <Head>
            <title>Reservio</title>
        </Head>
        <AuthProvider>
            <body>{children}</body>
        </AuthProvider>
        </html>
    );
}
