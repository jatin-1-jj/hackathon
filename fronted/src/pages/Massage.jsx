import React, { useState, useEffect } from "react";

// import { useContext } from "react";
// import { createContext } from "react";
// const AuthContext = createContext()
// const user = useContext(AuthContext); // ← valid only inside a component or hook

export default function Messages() {
 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");



  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await api.post("/messages", { text: newMessage});
      
      setMessages([...messages, res.data]);  
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">💬 Alumni Messages</h2>

      <div className="border rounded-lg p-4 h-96 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500">No messages yet...</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className="mb-2 p-2 bg-white rounded shadow-sm text-gray-800"
            >
              <strong>{msg.user?.name || "Anonymous"}:</strong> {msg.text}
            </div>
          ))
        )}
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex">
        <input
        id="userId"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow border p-2 rounded-l"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}