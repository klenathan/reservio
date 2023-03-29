import Logo from "@/components/NavBar/logo";
import SignUpForm from "@/components/SignUp";
export default function Page() {
  return (
    <div className="h-screen">
      <div className="grid grid-cols-3 place-items-center">
        <Logo />
      </div>

      <SignUpForm />
    </div>
  );
}
