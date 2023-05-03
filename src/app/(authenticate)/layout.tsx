import Logo from "components/NavBar/logo";

export default function AuthenticateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className="min-h-screen md:h-screen bg-cover bg-authenticate bg-oliveGreen flex flex-col
                    items-center justify-center"
    >
      <Logo logoStyle="white" />
      {children}
    </section>
  );
}
