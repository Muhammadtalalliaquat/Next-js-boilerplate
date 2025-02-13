"use client";

import { useDispatch } from "react-redux";
import { clearUser } from "@/store/features/userSlice";
import { io } from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "../home/main.module.css";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("https://back-end-sever-chat-app-production.up.railway.app/");

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

  const userListRef = useRef(userList);

  useEffect(() => {
    userListRef.current = userList;
  }, [userList]);

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

    socket.on("new_message", (data) => {
      console.log("New message received:", data);

      if (!data.message) {
        console.log("Received an undefined message");
        return;
      }

      const sender = userListRef.current.find(
        (user) => user._id === data.senderId
      );
      const senderName = sender ? sender.userName : data.senderId;

      toast.info(`🦄 New message from ${senderName}: ${data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
    });

    return () => {
      socket.off("all_users");
      socket.off("new_message");
    };
  }, []);

  const startChat = (userName, email, _id ) => {
    console.log("Start chat clicked:", { userName, email, _id });
    socket.emit("fetch_user", { email, _id , userName});

    // const friendsData = encodeURIComponent(JSON.stringify(userList));

    const queryString = new URLSearchParams({
      email,
      _id,
      userName,
      // friends: friendsData,
    }).toString();
    router.push(`/chat?${queryString}`);
  };

      

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Chat: </h2>
        <button onClick={logoutUser} className={styles.logoutButton}>
          Logout
        </button>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />

      <div className={styles.chatList}>
        {userList.length > 0 ? (
          userList.map((user, index) => (
            <div
              onClick={() => startChat(user.userName, user.email, user._id)}
              key={index}
              className={styles.chatItem}
            >
              {/* Profile Picture with First Letter */}
              <div className={styles.profilePic}>
                {/* {user.userName.charAt(0).toUpperCase()} */}
                {user.userName ? user.userName.slice(0, 1).toUpperCase() : ``}
              </div>
              {/* <button onClick={() => startChat(user.email, user._id)} className={styles.userName}>{user.userName}</button> */}
              <span className={styles.userName}>{user.userName}</span>
            </div>
          ))
        ) : (
          <p className={styles.noUsers}>No users connected</p>
        )}
      </div>
    </div>
  );
}
