import React, { useState } from "react";
import {
  NotificationManager,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import "react-notifications/lib/notifications.css";
export const metadata = {
  title: "Sign Up - Simple",
  description: "Page description",
};

export default function SignUp({ setUser }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle input changes
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const signupData = {
      name,
      id,
      email,
      password,
    };

    const apiUrl = "http://localhost:8000/signUp";

    fetchData(apiUrl, signupData)
      .then((result) => {
        setUser(true);
        navigate("/");
        NotificationManager.success(`Welcome ${name}`);
      })
      .catch((error) => {
        setUser(false);
        NotificationManager.error("Email or Id should be unique.");
      });
    setName("");
    setId("")
    setEmail("");
    setPassword("");
  };
  async function fetchData(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // You might need to include additional headers, such as authorization headers
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Handle non-OK responses
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const result = await response.json();
      return result;
    } catch (error) {
      // Handle network errors or errors during the fetch
      console.error("Error during fetch:", error.message);
      throw error;
    }
  }

  // Call the fetch function with the data

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome !</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleSubmit}>
              {/* ... other form elements ... */}
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="id"
                  >
                    ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="id"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="Make a Id"
                    value={id}
                    onChange={handleId}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                    Sign up
                  </button>
                </div>
              </div>
            </form>
            {/* ... rest of the code ... */}
          </div>
        </div>
      </div>
    </section>
  );
}
