import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]); // ✅ Default to array
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); 
        const usersArray = Array.isArray(response.data) ? response.data : [];

        setAllUsers(usersArray);
      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
        setAllUsers([]); 
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
