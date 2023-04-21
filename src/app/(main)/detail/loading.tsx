import LoadingSpinner from "components/LoadingSpinner";
import NavBarSkeleton from "components/NavBar/skeleton";

export default function Loading() {
    return (
        <div className="relative w-[100vw] h-[100vh] flex flex-col justify-center items-center">
            <NavBarSkeleton/>
            <div className="h-full w-full flex flex-col justify-center items-center">
                <LoadingSpinner text="Loading service, please wait"/>
            </div>
        </div>
    );
}