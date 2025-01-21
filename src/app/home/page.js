"use client";

import { clearUser } from "@/store/features/userSlice";
import { useDispatch } from "react-redux";


import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to our site!</h2>
      <button onClick={logoutUser} style={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  logoutButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#FF4D4D",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
