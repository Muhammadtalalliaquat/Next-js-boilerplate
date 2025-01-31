"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "../chat/main.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
// import Image from "next/image";

const socket = io("http://localhost:4000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const [msgError, setMsgError] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const email = searchParams.get("email");
  const _id = searchParams.get("_id");

  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  const senderId = loggedInUser?._id;

  useEffect(() => {
    if (!email || !_id) {
      console.log("Missing chat user details:", { email, _id });
    } else {
      console.log("Chat with:", userName, email, _id);
    }

    socket.emit("user_online", { userId: senderId });

    socket.on("user_status", ({ userId, status }) => {
      if (userId === _id) {
        setIsOnline(status === "online");
      }
    });

    socket.on("new_chat", (data) => {
      console.log("Message received:", data);
      setNewMessage((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.emit("user_offline", { userId: senderId });
      socket.off("new_chat");
      socket.off("user_status");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      if (!senderId || !_id) {
        setMsgError("User not identified. Please log in.");
        return;
      }
      const chatMessage = {
        message,
        senderId: senderId,
        receiverId: _id,
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("new_chat", chatMessage);

      setMessage("");
    } else {
      setMsgError("Please enter a message.");
    }
  };

  useEffect(() => {
    if (msgError) {
      const timer = setTimeout(() => {
        setMsgError("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [msgError]);

  return (
    <>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <button
            className={styles.backButton}
            onClick={() => router.push("/home")}
          >
            <FaArrowLeft />
          </button>
          <div className={styles.profilePic}>
            {userName ? email.slice(0, 1).toUpperCase() : ``}
          </div>

          <div className={styles.profileContainer}>
            <span className={styles.userName}>
              {userName || "Unknown User"}
            </span>
            <p
              className={`${styles.status} ${
                isOnline ? styles.online : styles.offline
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <div className={styles.chatBox}>
          {newMessage.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageWrapper} ${
                msg.senderId === senderId
                  ? styles.sentMessage
                  : styles.receivedMessage
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  msg.senderId === senderId ? styles.sent : styles.received
                }`}
              >
                <p>{msg.message}</p>
                <p className={styles.timestamp}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={styles.inputField}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            <IoMdSend size={20} />
          </button>
        </div>

        {msgError && <p className={styles.errorText}>{msgError}</p>}
      </div>
    </>
  );
}
