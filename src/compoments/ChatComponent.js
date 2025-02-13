"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "../app/chat/main.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";


const socket = io("https://back-end-sever-chat-app-production.up.railway.app/");

export default function Chat() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const [msgError, setMsgError] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userName = searchParams.get("userName");
  const email = searchParams.get("email");
  const _id = searchParams.get("_id");

  // const friendsData = searchParams.get("friends");
  // const friends = friendsData ? JSON.parse(decodeURIComponent(friendsData)) : [];

  // const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};
  const senderId = loggedInUser?._id;

  const deleteMessage = (messageId) => {
    if (!senderId) {
      console.log("User not authenticated.");
      return;
    }

    socket.emit("delete_message", { messageId, senderId });

    setNewMessage((prevMessages) =>
      prevMessages.filter((msg) => msg._id !== messageId)
    );
  };

  useEffect(() => {
    // console.log("Sender ID:" , senderId , "Friends:", friends);

    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      setLoggedInUser(user);
    }

    if (!senderId || !_id) return;

    socket.emit("user_online", { userId: senderId });

    socket.on("user_status", ({ userId, status }) => {
      if (userId === _id) {
        setIsOnline(status === "online");
      }
    });

    socket.emit("fetch_prev_chat", { senderId, receiverId: _id });

    socket.on("prev_chat", (messages) => {
      messages.forEach((msg) => {
        msg.time = new Date(msg.createdAt).toLocaleString();
      });
      setNewMessage(messages);

      // socket.emit("message_seen", { senderId: _id, receiverId: senderId });
    });

    socket.on("new_chat", (data) => {
      console.log("Message received:", data);
      setNewMessage((prevMessages) => [...prevMessages, data]);

      // if (data.receiverId === senderId) {
      //   socket.emit("message_seen", {
      //     senderId: data.senderId,
      //     receiverId: senderId,
      //   });
      // }
    });

    socket.on("message_deleted", ({ messageId }) => {
      setNewMessage((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId)
      );
    });

    // socket.emit('new_message', data);

    // socket.on("message_seen_update", ({ senderId, receiverId }) => {
    //   setNewMessage((prevMessages) =>
    //     prevMessages.map((msg) =>
    //       msg.senderId === senderId && msg.receiverId === receiverId
    //         ? { ...msg, status: "seen" }
    //         : msg
    //     )
    //   );
    // });

    return () => {
      socket.emit("user_offline", { userId: senderId });
      socket.off("user_status");
      socket.off("prev_chat");
      socket.off("send_message");
      socket.off("new_chat");
      socket.off("message_deleted");
    };
  }, [senderId, _id]);

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

      socket.emit("new_message", chatMessage);

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
              key={index + msg.senderId}
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
                {/* <p className={styles.statusIcon}>
                  {msg.status === "seen"
                    ? "✅"
                    : msg.status === "delivered"
                    ? "✓✓"
                    : "✓"}
                </p> */}
              </div>
              <div className={styles.msgDiv}>
                <p
                  className={`${styles.timestamp} ${
                    msg.senderId === senderId
                      ? styles.sentTimestamp
                      : styles.receivedTimestamp
                  }`}
                >
                  {msg.time}
                </p>

                {msg.senderId === senderId && (
                  <button
                    onClick={() => deleteMessage(msg._id)}
                    className={styles.deleteButton}
                  >
                    <FaDeleteLeft size={15} color="black"/>
                  </button>
                )}
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