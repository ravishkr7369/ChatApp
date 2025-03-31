import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";

function Search() {
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (!query) {
      setFilteredUsers([]);
      return;
    }

    const results = allUsers.filter((user) =>
      user.fullname?.toLowerCase().includes(query)
    );
    setFilteredUsers(results);
  };

  const handleSelectUser = (user) => {
    setSelectedConversation(user);
    setSearch("");
    setFilteredUsers([]);
  };

  return (
    <div className="relative p-4">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-800 border border-gray-700 rounded-full px-4 py-2 shadow-md">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          className="w-full bg-transparent outline-none text-white placeholder-gray-400"
          placeholder="Search users..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* User List Dropdown */}
      {filteredUsers.length > 0 && (
        <div className="absolute w-full bg-gray-800 mt-2 rounded-lg shadow-lg overflow-hidden z-10">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 py-2 px-3 hover:bg-gray-700 cursor-pointer transition-all"
              onClick={() => handleSelectUser(user)}
            >
              <img
                // src={user.profilePic || "/default-avatar.png"}
                src="https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
              <p className="text-white">{user.fullname}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
