import LoadingSpinner from "components/LoadingSpinner";

export default function Loading() {
    return (
        <div
            className="relative h-[calc(100vh_-_10rem)] -top-[5rem] w-full flex flex-col justify-center items-center overflow-hidden -z-10">
            <LoadingSpinner text="Loading service, please wait"/>
        </div>
    );
}
