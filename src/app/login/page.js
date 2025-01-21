

// import AuthForm from "../login/page";

// import { useState } from "react";
// import { setCookie } from "cookies-next";
// import { ApiRoutes } from "@/constant/constant";
// import { loginUser } from "@/store/features/userSlice";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { resetTaskState } from "@/store/features/taskSlice";
// import Link from "next/link";

export default function Login() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(``);
  // const dispatch = useDispatch();
  // const router = useRouter();

  // const loginUserToAPI = (e) => {
  //   e.preventDefault();
  //   dispatch(resetTaskState());
  //   const obj = {
  //     email: e.target[0].value,
  //     password: e.target[1].value,
  //   };
  //   axios
  //     .post(ApiRoutes.login, obj)
  //     .then((res) => {
  //       console.log(`res.data=>`, res.data);
  //       setCookie(`token`, res.data?.data?.token);
  //       dispatch(loginUser(res.data?.data.user));
  //       setIsLoading(true);
  //       router.push(`/task`);
  //     })
  //     .catch((error) => {
  //       console.log(error.response.data);
  //       const errorMessage =
  //         error.response?.data?.msg || "Login failed. Please try again.";
  //       setError(errorMessage);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <>

      {/* <form onSubmit={loginUserToAPI} className="max-w-sm mx-auto mt-10">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="enter email"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="enter password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {error && (
          <p className="text-red-500 text-center text-sm mb-5">{error}</p> // Display error message if present
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? `loading...` : `Sign in`}
        </button>
        <p className="text-black  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Don&apos;t have an account ?
          <Link
            href="/signup"
            className="text-blue-600 underline hover:text-blue-400"
          >
            Sign up here
          </Link>
        </p>
      </form> */}
    </>
  );
}
