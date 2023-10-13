// src/components/Form.js
import React, { useState, useEffect } from "react";

const Form = () => {
  const [id, setId] = useState("");
  const [friendId, setFriendId] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);
  const [disabled, setDisabled] = useState(true);
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
    if (id == "" || friendId == "" || password == "" || photo == null) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  useEffect(() => {
    handleDisabled();
  }, [setId, setFriendId, setPassword, photo]);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("friendId", friendId);
    formData.append("password", password);
    formData.append("file", photo);

    try {
      const response = await fetch("http://localhost:3001/uploadPhoto", {
        method: "POST",
        body: formData,
      });

      const json = response;
      console.log(json, "this is response");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded shadow-md">
      <form enctype="multipart/form-data">
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
  );
};

export default Form;
