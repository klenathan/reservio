import { SyncLoader } from "react-spinners";

const LoadingSpinner = (props: { loading: boolean }) => {
  return (
    <div className="flex flex-col w-full my-8 items-center justify-center gap-5">
      <SyncLoader loading={props.loading} color="#59981A" />
      <p className="text-oliveGreen font-semibold">Loading, please wait</p>
    </div>
  );
};

export default LoadingSpinner;
