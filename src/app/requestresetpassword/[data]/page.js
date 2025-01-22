"use client";

import { ApiRoutes } from "@/constant/constant";
// import { useSearchParams  } from "react-router-dom";
import style from "../../requestresetpassword/[data]/main.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Resetpassword({ params }) {
//   const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  

  useEffect(()=> {
    console.log("data revicve " , params);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [])

  const hanedlePasswordReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!password) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(ApiRoutes.forgotPasswordSent, {
        id,
        token,
        password
      });
      console.log(response.data.user)
      setSuccessMessage(response.data.message || "Password reset successful.");
      setError(null);
      setIsSubmitting(false);
      //   setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.log("Error resetting password:", error);
      const errorMessage = error.response?.data?.msg || "Something went wrong.";
      setError(errorMessage);
      setSuccessMessage("");
    } 
  };

  return (
    <div className={style.resetPasswordContainer}>
      <h2>Reset Password</h2>
      {error && <p className={style.errorMessage}>{error}</p>}
      {successMessage && (
        <p className={style.successMessage}>{successMessage}</p>
      )}
      <form onSubmit={hanedlePasswordReset}>
        <div className={style.formGroup}>
          <label htmlFor="password">New Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={style.input}
          />
        </div>
        <button type="submit" disabled={isSubmitting} className={style.button}>
          {isSubmitting ? "Resetting..." : "Save Password"}
        </button>
      </form>
    </div>
  );
}

