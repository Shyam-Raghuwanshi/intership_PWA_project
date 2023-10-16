// src/components/Form.js
import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
const Form = ({ user }) => {
  const [id, setId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleFriendIdChange = (e) => {
    setFriendId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDisabled = () => {
    if (id == "" || friendId === "" || password === "" || photo == null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    handleDisabled();
  }, [setId, setFriendId, setPassword, photo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("friendId", friendId);
    formData.append("password", password);
    formData.append("file", photo);

    try {
      const response = await fetch("http://localhost:8000/uploadPhoto", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      if (json.success) {
        localStorage.setItem("token", json.token);
        navigate("/");
        NotificationManager.success("Successfully upload your details");
        setDisabled(true);
      }
    } catch (error) {
      NotificationManager.error(json.messages);
      console.log("Error:", error);
    }
  };

  return (
    <>
      {user && (
        <div className="mb-10">
          <h1 className="text-center mt-[11rem] mb-5 font-bold text-5xl">
            Add Friends
          </h1>
          <div className="max-w-md mx-auto  p-6 bg-white rounded shadow-md">
            <form encType="multipart/form-data">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                ID:
                <input
                  required
                  type="text"
                  value={id}
                  onChange={handleIdChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </label>
              <br />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Friend ID:
                <input
                  required
                  type="text"
                  value={friendId}
                  onChange={handleFriendIdChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </label>
              <br />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Password:
                <input
                  required
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </label>
              <br />
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Photo:
                <input
                  required
                  type="file"
                  name="file"
                  onChange={handlePhotoChange}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </label>
              <br />
              <button
                onClick={handleSubmit}
                disabled={disabled}
                className="mt-4 bg-blue-500 text-white p-2 disabled:bg-blue-200 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="text-center mt-60 pt-40 ">
        {!user && (
          <Link
            to="/signin"
            class="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
          >
            <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
            <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
              <svg
                class="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                class="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
              ADD Friends
            </span>
          </Link>
        )}
      </div>
    </>
  );
};



export default Form;
