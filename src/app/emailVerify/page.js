// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { verifyEmail } from "../../compoments/authAction";
// import { useLocation } from "react-router-dom";
import styles from "./main.module.css";

export default function EmailVerificationPage() {
  // const dispatch = useDispatch();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const token = queryParams.get("token");

  // useEffect(() => {
  //   if (token) {
  //     dispatch(verifyEmail(token));
  //   }
  // }, [dispatch, token]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Verify Your Email</h1>
        <p className={styles.message}>
          Please check your inbox for a verification link and follow the
          instructions to verify your email address.
        </p>
        {/* {token ? (
          <p>Verifying your email... Please wait.</p>
        ) : (
          <p>
            Invalid or missing token. Please check your email verification link.
          </p>
        )} */}
        {/* <p className={styles.note}>
           Didn&apos;t receive the email? Check your spam folder or <a href="/resend" className={styles.link}>resend verification email</a>.
         </p> */}
      </div>
    </div>
  );
}
