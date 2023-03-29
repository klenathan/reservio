"use client";
import Button from "../Button";
const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh]">
      <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-3xl text-oliveGreen font-bold uppercase text-center">
            Login to Reservio
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="e.g. reservio@gmail.com"
                required={true}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="e.g. reservio2023"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required={true}
              />
            </div>

            <div className="text-center">
              <Button
                btnStyle="filled"
                onClick={() => {
                  console.log("Clicked");
                }}
              >
                Sign in
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm font-light text-gray-500 mb-2">
                Don’t have an account yet?{" "}
                <a
                  href={"/signup"}
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </a>
              </p>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
