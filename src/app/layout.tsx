import "./globals.css";
import {AuthProvider} from "components/Auth/Context/AuthContext";
import {ReactNode} from "react";

export const metadata = {
    title: "Reservio",
    description: "Reserve it? Reservio",
    icons: {
        icon: "/assets/profile.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: ReactNode;
}) {
    return (
        <html lang="en">
        <AuthProvider>
            <body>{children}</body>
        </AuthProvider>
        </html>
    );
}
