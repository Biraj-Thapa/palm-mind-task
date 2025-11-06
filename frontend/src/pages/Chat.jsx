import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addMessage, setMessages } from "../features/messageSlice";
import Navbar from "../components/Navbar";
import API, { setAuthToken } from "../utils/api";

let socket;

export default function Chat() {
  const dispatch = useDispatch();
  const messages = useSelector((s) => s.messages.list);
  const auth = useSelector((s) => s.auth);
  const [text, setText] = useState("");
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalChats: 0,
    onlineCount: 0,
  });
  const messagesEndRef = useRef();

  useEffect(() => {
    if (!auth.token) return;

    setAuthToken(auth.token);

    (async () => {
      try {
        const [mRes, sRes] = await Promise.all([
          API.get("/messages"),
          API.get("/stats"),
        ]);
        dispatch(setMessages(mRes.data));
        setStats({
          totalUsers: sRes.data.totalUsers || 0,
          totalChats: sRes.data.totalChats || 0,
          onlineCount: sRes.data.onlineCount || 0,
        });
      } catch (err) {
        console.error(err);
      }
    })();

    socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token: auth.token },
    });

    socket.on("connect", () => {
      console.log("connected to socket", socket.id);
    });

    socket.on("receiveMessage", (msg) => {
      dispatch(addMessage(msg));
      setStats((prev) => ({ ...prev, totalChats: prev.totalChats + 1 }));
    });

    socket.on("userJoined", (payload) => {
      setStats((prev) => ({
        ...prev,
        onlineCount:
          payload.onlineCount != null
            ? payload.onlineCount
            : prev.onlineCount + 1,
      }));
      toast.info(`${payload.user.name} joined`);
    });

    socket.on("userLeft", (payload) => {
      setStats((prev) => ({
        ...prev,
        onlineCount:
          payload.onlineCount != null
            ? payload.onlineCount
            : Math.max(0, prev.onlineCount - 1),
      }));
    });

    socket.on("connect_error", (err) => {
      console.error("Socket error:", err.message);
      toast.error("Socket error: " + err.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [auth.token, dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit("sendMessage", { text });
    setText("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex flex-col flex-1 max-w-5xl mx-auto w-full mt-4 border rounded-2xl shadow bg-white overflow-hidden">
        <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-700">Global Chat Room</h2>
          <div className="flex gap-4 text-sm text-gray-600">
            <span>🟢 {stats.onlineCount} online</span>
            <span>💬 {stats.totalChats} chats</span>
            <span>👥 {stats.totalUsers} users</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m) => (
            <div key={m._id} className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">
                {m.user?.name} •{" "}
                {new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div className="max-w-lg bg-blue-100 text-gray-800 px-3 py-2 rounded-xl self-start">
                {m.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={sendMessage}
          className="p-3 border-t bg-gray-50 flex gap-2"
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
