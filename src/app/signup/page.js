// "use client";
// import AuthForm from "../signup/page";

// import Link from "next/link";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { setCookie } from "cookies-next";
// import { ApiRoutes } from "@/constant/constant";
// import { signupUser } from "@/store/features/userSlice";
// import { resetTaskState } from "@/store/features/taskSlice";



export default function Signup() {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(``);
  // const dispatch = useDispatch();
  // const router = useRouter();

  // const SignupUserToAPI = async (e) => {
  //   e.preventDefault();
  //   dispatch(resetTaskState());
  //   const obj = {
  //     userName: e.target[0].value,
  //     email: e.target[1].value,
  //     password: e.target[2].value,
  //   };
  //   try {
  //     const res = await axios.post(ApiRoutes.register, obj);
  //     setCookie("token", res.data?.data?.token);
  //     console.log("API Response:", res.data?.data?.user , res.data?.data?.token);
  //    await dispatch(signupUser(res.data?.data.user));
  //     router.push(`/task`);
  //   } catch (error) {
  //     if (error.response) {
  //       // Backend returned an error
  //       const errorMessage = error.response?.data?.msg || "Sign up failed. Please try again.";
  //       setError(errorMessage);  // Set the error message to show to the user
  //     } else {
  //       // Handle cases where error.response does not exist
  //       setError("An unknown error occurred. Please try again.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      {/* <form onSubmit={SignupUserToAPI} className="max-w-sm mx-auto mt-10">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="enter name"
            required
          />
        </div>
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
          <p className="text-red-500 text-center text-sm mb-5">{error}</p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLoading ? `loading...` : `Sign up`}
        </button>
        <p className="max-w-sm mx-auto text-black  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-600 underline hover:text-blue-400"
          >
            Sign in here
          </Link>
        </p>
      </form> */}
    </>
  );
}
