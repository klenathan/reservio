import LoginForm from "@/components/Login";
import Logo from "@/components/NavBar/logo";
export default function Page() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 place-items-center">
        <Logo />
      </div>

      <LoginForm />
    </div>
  );
}
