import Logo from "components/NavBar/logo";

export default function AuthenticateLayout({children}: { children: React.ReactNode }) {
    return (
        <section className={"min-h-screen bg-authenticate bg-oliveGreen py-8 px-4 sm:py-14"}>
            <div className="flex flex-col items-center justify-center">
                <Logo/>
                 {children}
            </div>

        </section>)
}