import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="w-full h-screen flex flex-col bg-black text-gray-300">
      {/* Search Bar (Fixed) */}
      <div className="p-3">
        <Search />
      </div>

      {/* Scrollable Users List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-2">
        <Users />
      </div>

      {/* Fixed Logout Button */}
      <div className="">
        <Logout />
      </div>
    </div>
  );
}

export default Left;
