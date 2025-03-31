import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";


function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "online" : "offline";
  };

  return (
    <div className="relative flex items-center h-[7vh] navbar duration-300 rounded-md px-4">
      {/* Menu Icon (Mobile Only) */}
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden mr-3"
      >
        <CiMenuFries className="text-white text-xl" />
      </label>

      {/* User Profile & Info */}
      <div className="flex items-center space-x-4">
        {/* Profile Picture */}
        <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-gray-500">
          <img
            // src={profile}
            src="https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* User Details */}
        <div>
          <h1 className="text-lg text-white font-semibold">
            {selectedConversation?.fullname}
          </h1>
          <span
            className={`text-sm ${
              getOnlineUsersStatus(selectedConversation?._id) === "online"
                ? "text-green-400"
                : "text-gray-400"
            }`}
          >
            {getOnlineUsersStatus(selectedConversation?._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
