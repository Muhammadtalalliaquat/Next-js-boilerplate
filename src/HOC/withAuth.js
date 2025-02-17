
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function withAuthCheck(WrappedComponent) {
  return function ProtectedComponent(props) {
    const router = useRouter();
    const { isAuthenticated, emailVerifed } = useSelector(
      (state) => state.user
    );

    useEffect(() => {
      if (!isAuthenticated) {
        console.log("User not authenticated. Redirecting...");
        router.push("/");
      } 
      else if (!emailVerifed && router.pathname !== "/emailVerify") {
        console.log("Email not verified. Redirecting to emailVerify...");
        router.push("/emailVerify");
      }
    }, [isAuthenticated, emailVerifed, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

