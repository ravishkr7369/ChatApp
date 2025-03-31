import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";


function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user?._id);

  return (
    <div
      className="flex items-center gap-4 py-1 px-3 cursor-pointer rounded-lg hover:bg-gray-700 transition-all duration-300"
      onClick={() => setSelectedConversation(user)}
    >
      {/* User Avatar with Online Status */}
      <div className="relative">
        <img
          // src={user.profilePic || profile}
          src="https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
          alt="user"
          className="w-10 h-10 rounded-full object-cover border border-gray-500"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></span>
        )}
      </div>

      {/* User Info */}
      <div>
        <h1 className="text-white font-semibold text-lg">{user?.fullname}</h1>
        <h1 className="text-white font-semibold text-sm">{user?.email}</h1>
      </div>
    </div>
  );
}

export default User;
