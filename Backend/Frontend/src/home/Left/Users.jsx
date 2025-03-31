import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  // ✅ Ensure `allUsers` is always an array
  const safeUsers = Array.isArray(allUsers) ? allUsers : [];

  return (
    <div className="py-2">
      <h1 className="px-6 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div className="mt-2 space-y-2">
        {loading ? (
          <p>Loading...</p> // ✅ Show loading state
        ) : safeUsers.length > 0 ? (
          safeUsers.map((user) => <User key={user?._id} user={user} />)
        ) : (
          <p>No users found.</p> // ✅ Show message if empty
        )}
      </div>
    </div>
  );
}

export default Users;
