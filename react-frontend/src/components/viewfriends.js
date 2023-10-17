import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "flowbite";
import { Link } from "react-router-dom";
const Viewfriends = ({ user, id }) => {
  const [friends, setFriends] = useState(null);
  const [userId, setUserId] = useState(null);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetchUsers`);
      const data = await response.json();
      if (data.success && data.users.length != 0) {
        setFriends(data.users[0].friends);
        setUserId(data.users[0].id);
      }
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRemoveFriend = async (friendId) => {
    const body = { id, friendId };
    try {
      const response = await fetch("http://localhost:8000/deleteFriend", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const json = await response.json();
      if (json.success) {
        fetchUsers();
        NotificationManager.success(json.message);
      } else {
        NotificationManager.error(json.message);
      }
    } catch (error) {
      NotificationManager.success(error.message);
    }
  };

  return (
    <>
      {user && (
        <div>
          <div className=" w-full m-auto grid grid-cols-1 gap-y-5 grid-rows-1 pt-36 md:w-[80%] md:grid-rows-2 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-3">
            {friends?.map((user) => {
              // console.log(user);
              return (
                <div
                  key={user.friendId}
                  className="w-full max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow"
                >
                  <div className="flex flex-col items-center py-10">
                    <img
                      className=" h-32 w-32 mb-3 rounded-full shadow-lg"
                      src={`./uploads/${userId}/${user.friendId}${user.photo}`}
                      alt="img"
                    />
                    <h5 className="mb-1 text-xl font-medium  text-black">
                      {user.friendId}
                    </h5>

                    <div className="flex mt-4 space-x-3 md:mt-6">
                      <button
                        onClick={() => {
                          handleRemoveFriend(user.friendId);
                        }}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:red-blue-300"
                      >
                        Remove
                      </button>
                      <Link to={`/chat?{'userid'}/${'friendid'}`}>
                        <button
                          href="#"
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                        >
                          Message
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {friends == null ||
            friends == undefined ||
            (friends?.length == 0 && (
              <h1 className="text-4xl text-center py-64">No Friends yet!</h1>
            ))}
        </div>
      )}
      {!user && (
        <h1 className="text-4xl text-center py-64">
          Signin For See your Friends
        </h1>
      )}
    </>
  );
};

export default Viewfriends;
