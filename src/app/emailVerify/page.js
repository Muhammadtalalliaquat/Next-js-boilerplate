"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../../compoments/authAction";
import { useRouter , useSearchParams } from "next/navigation";
import styles from "./main.module.css";

export default function EmailVerificationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch();
  // const emailVerified = useSelector((state) => state.user.emailVerifed);
  // const user = useSelector((state) => state.user);

  const router = useRouter();

  const isVerified = token ? verifyEmail(token) : false;

  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
    console.log(isVerified)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  
  useEffect(() => {
    console.log(isVerified)
    if (isVerified) {
      router.push("/home"); 
    }
  }, [isVerified, router]);


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          {isVerified ? "Email Verified" : "Verify Your Email"}
        </h1>
        <p className={styles.message}>
          {isVerified
            ? "Your email has been successfully verified!"
            : "Please check your inbox for a verification link and follow the instructions to verify your email address."}
        </p>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { verifyEmail } from "../../compoments/authAction";
// import { verifirdEmail } from "../../compoments/emailverified";
// import { useSearchParams } from "next/navigation";
// import styles from "./main.module.css";

// export default function EmailVerificationPage() {
//   const searchParams = useSearchParams();
//   const token = searchParams.get("token");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log(token, "avaliable");

//     if (token) {
//       dispatch(verifyEmail(token));
//     }
//   }, [dispatch, token]);

//   return (
//     <>
//       {dispatch(verifirdEmail(token)) ? (
//         <div className={styles.container}>
//           <div className={styles.card}>
//             <h1 className={styles.title}>Verify Your Email</h1>
//             <p className={styles.message}>
//               Please check your inbox for a verification link and follow the
//               instructions to verify your email address.
//             </p>
//             {/* {token ? (
//       <p>Verifying your email... Please wait.</p>
//     ) : (
//       <p>
//         Invalid or missing token. Please check your email verification link.
//       </p>
//     )} */}
//             {/* <p className={styles.note}>
//        Didn&apos;t receive the email? Check your spam folder or <a href="/resend" className={styles.link}>resend verification email</a>.
//      </p> */}
//           </div>
//         </div>
//       ) : (
//         <verifirdEmail />
//       )}
//     </>
//   );
// }
