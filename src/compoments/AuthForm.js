"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "./authAction";
import { useRouter } from "next/navigation";
import { ApiRoutes } from "@/constant/constant";
import styles from "./main.module.css";
import axios from "axios";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  // const [error, setError] = useState(``);
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.user.error);

  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({ email, password }));
        if (result.success) {
          router.push("/home");
        }
      } else {
        const result = await dispatch(
          registerUser({ email, password, userName })
        );

        if (result.success) {
          router.push("/emailVerify");
        }
        // else {
        //   setError(result.error);
        // }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      // setError("An unexpected error occurred. Please try again.");
    }
  };

  const requestPasswordReset = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      return;
    }

    try {
      setMessage("");
      const response = await axios.post(ApiRoutes.forgotPassword, { email });

      if (!response.data.error) {
        setMessage(
          response.data.msg || "Password reset email sent successfully."
        );
      } else {
        setMessage("An error occurred while sending the reset email.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "Failed to send reset email. Please try again.";
      console.error("Error:", errorMessage);
      setMessage(errorMessage);
    }
  };

  return (
    // <div className="max-w-sm mx-auto mt-10">
    //   <h2 className="text-center text-xl font-semibold mb-5">
    //     {isLogin ? "Login" : "Register"}
    //   </h2>

    //   <form onSubmit={handleSubmit}>
    //     {!isLogin && (
    //       <div className="mb-5">
    //         <label
    //           htmlFor="name"
    //           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //         >
    //           Your Name
    //         </label>
    //         <input
    //           type="text"
    //           id="name"
    //           value={userName}
    //           onChange={(e) => setUserName(e.target.value)}
    //           placeholder="Enter name"
    //           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //           required
    //         />
    //       </div>
    //     )}

    //     <div className="mb-5">
    //       <label
    //         htmlFor="email"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="Enter email"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         required
    //       />
    //     </div>

    //     <div className="mb-5">
    //       <label
    //         htmlFor="password"
    //         className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    //       >
    //         Your Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         placeholder="Enter password"
    //         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    //         required
    //       />
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    //     >
    //       {isLogin ? "Login" : "Register"}
    //     </button>
    //   </form>

    //   <div className="text-center mt-5">
    //     <p className="text-sm mb-2">
    //       {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
    //       <button
    //         type="button"
    //         onClick={() => setIsLogin(!isLogin)}
    //         className="text-blue-700 hover:underline dark:text-blue-500"
    //       >
    //         {isLogin ? "Register here" : "Login here"}
    //       </button>
    //     </p>
    //     <div>
    //       <button
    //         type="button"
    //         onClick={requestPasswordReset}
    //         className="text-blue-700 hover:underline dark:text-blue-500"
    //       >
    //         Forgot Password
    //       </button>

    //       {message && (
    //         <p
    //           className={`text-sm mt-2 ${
    //             message.includes("successfully")
    //               ? "text-green-500"
    //               : "text-red-500"
    //           }`}
    //         >
    //           {message}
    //         </p>
    //       )}
    //     </div>
    //     {authError && (
    //       <p className="text-red-500 text-center text-sm mb-5">{authError}</p>
    //     )}
    //   </div>
    // </div>

    <div className={styles.container}>
      <h2 className={styles.title}>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {!isLogin && (
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className={styles.input}
              required
            />
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={styles.input}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <div className={styles.footer}>
        <p className={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className={styles.linkButton}
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>

        {isLogin && (
          <button
            type="button"
            onClick={requestPasswordReset}
            className={styles.linkButton}
          >
            Forgot Password?
          </button>
        )}

        {message && (
          <p
            className={`${styles.message} ${
              message.includes("successfully") ? styles.success : styles.error
            }`}
          >
            {message}
          </p>
        )}
        {authError && <p className={styles.error}>{authError}</p>}
      </div>
    </div>
  );
}
