import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return; 
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 w-full bg-gray-900 p-3 border-t border-gray-700"
    >
      <div className="flex items-center max-w-3xl mx-auto w-full px-2 space-x-2">
        {/* Input Field */}
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-gray-800 text-white border border-gray-600 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send Button (Styled Like WhatsApp) */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white text-center p-3 rounded-full transition duration-300"
        >
          <IoSend className="text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
