"use client";

import { useDispatch } from "react-redux";
import { clearUser } from "@/store/features/userSlice";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../home/main.module.css";

const socket = io("http://localhost:4000");

export default function Home() {
  const [userList, setUserList] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutUser = () => {
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(`user`));
    if (storedUser && storedUser._id) {
      socket.emit("register_user", {
        _id: storedUser._id,
        userName: storedUser.userName,
      });
    } else {
      console.log("User not found in local storage");
    }
    socket.on("all_users", (allUsers) => {
      console.log("Received users:", allUsers);
      setUserList(allUsers);
    });

    return () => socket.off("all_users");
  }, []);

  const startChat = (email, _id) => {
    console.log("Start chat clicked:", { email, _id });
    socket.emit("fetch_user", { email, _id });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Chat App</h2>

      <div className={styles.chatList}>
        {userList.length > 0 ? (
          userList.map((user, index) => (
            <div key={index} className={styles.chatItem}>
              {/* Profile Picture with First Letter */}
              <div className={styles.profilePic}>
                {user.userName.charAt(0).toUpperCase()}
              </div>
              {/* <button onClick={() => startChat(user.email, user._id)} className={styles.userName}>{user.userName}</button> */}
              <span
                onClick={() => startChat(user.email, user._id)} // Pass user data
                className={styles.userName}
              >
                {user.userName}
              </span>
              <span className={user.online ? styles.online : styles.offline}>
                {user.online ? "🟢" : "⚪"}
              </span>
            </div>
          ))
        ) : (
          <p className={styles.noUsers}>No users connected</p>
        )}
      </div>

      <button onClick={logoutUser} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
}
