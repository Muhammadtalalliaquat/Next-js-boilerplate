// import { useEffect } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { useSelector } from "react-redux";

// export default function withAuthCheck(WrappedComponent) {
//   return function ProtectedComponent(props) {
//     const router = useRouter();
//     const pathname = usePathname();
//     const { isAuthenticated, emailVerifed } = useSelector(
//       (state) => state.user
//     );

//     useEffect(() => {
//       if (!isAuthenticated) {
//         console.log("User not authenticated. Redirecting...");
//         console.log("Auth State:", { isAuthenticated, emailVerifed });
//         router.push("/");
//       } else if (!emailVerifed && pathname !== "/emailVerify") {
//         console.log("Email not verified. Redirecting to emailVerify...");
//         router.push("/emailVerify");
//       } else if (emailVerifed && pathname === "/emailVerify") {
//         console.log("Email verified. Redirecting to home...");
//         router.push("/home");
//       }
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isAuthenticated, emailVerifed, pathname, router]);

//     if (!isAuthenticated || (!emailVerifed && pathname !== "/emailVerify")) {
//       return null;
//     }

//     return <WrappedComponent {...props} />;
//   };
// }

