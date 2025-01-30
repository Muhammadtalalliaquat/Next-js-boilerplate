"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import styles from "../chat/main.module.css";

const socket = io("http://localhost:4000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState([]);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    socket.on("new_chat", (data) => {
      console.log("Message received:", data);
      setNewMessage((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("new_chat");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        message,
        senderId: "User1",
        receiverId: "User2",
        time: new Date().toLocaleTimeString(),
      };
      socket.emit("new_chat", chatMessage);
      setMessage("");
      setMsgError("");
    } else {
      setMsgError("Please enter a message.");
    }
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <h1 className={styles.header}>Chat App</h1>

        <div className={styles.chatBox}>
          {/* Message List */}
          {newMessage.map((msg, index) => (
            <div
              key={index}
              className={
                msg.senderId === "User1"
                  ? styles.sentMessage
                  : styles.receivedMessage
              }
            >
              <p className={styles.messageText}>{msg.message}</p>
              <small className={styles.messageMeta}>
                {msg.senderId} • {msg.time}
              </small>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className={msgError ? styles.inputError : styles.input}
          />
          <button onClick={sendMessage} className={styles.sendButton}>
            Send
          </button>
        </div>

        {/* Error Message */}
        {msgError && <p className={styles.errorText}>{msgError}</p>}
      </div>
    </>
  );
}
