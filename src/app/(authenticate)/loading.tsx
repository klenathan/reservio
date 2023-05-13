import LoadingSpinner from "@/components/LoadingSpinner";
import Logo from "components/NavBar/logo";

export default function LoadingAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className=""
    >
      <LoadingSpinner />
    </div>
  );
}
