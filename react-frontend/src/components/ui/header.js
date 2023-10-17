"use client";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./mobile-menu";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Copy, UserCircle } from "lucide-react";
import { NotificationManager } from "react-notifications";
export default function Header({
  user,
  logout,
  setUser,
  friendsCount,
  id,
  userName,
  isTokenExpired,
}) {
  const ref = useRef(null);
  const copyId = useRef(null);
  const navigate = useNavigate();
  const toggleProfileDropdown = () => {
    ref.current.classList.toggle("hidden");
  };

  const handleCopyId = () => {
    const inputElement = copyId.current;
    inputElement.select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    NotificationManager.success("Coped!");
  };

  return (
    <header className="sticky top-0 w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out text-white backdrop-blur-sm shadow-lg ">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* <Logo /> */}

            <Link
              to="/"
              className="font-medium text-gray-900 hover:text-gray-500 px-5 py-3 flex items-center transition duration-150 ease-in-out"
            >
              Home
            </Link>
          </div>

          {/* Desktop navigation */}
          {!user && (
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                <li onClick={isTokenExpired}>
                  <Link
                    to={"/signin"}
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </li>
                <li onClick={isTokenExpired}>
                  <Link
                    to={"/signup"}
                    className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3"
                  >
                    <span>Sign up</span>
                    <svg
                      className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                        fillRule="nonzero"
                      />
                    </svg>
                  </Link>
                </li>
              </ul>
            </nav>
          )}
          {user && (
            <nav className="hidden md:flex md:grow">
              {/* Desktop sign in links */}
              <ul className="flex grow justify-end flex-wrap items-center">
                <li>
                  <Link
                    to={"/viewfriends"}
                    className="font-medium text-gray-600 hover:text-gray-900 px-4 py-1 flex items-center transition duration-150 ease-in-out"
                  >
                    Friends
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      setUser(false);
                      navigate("/");
                    }}
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Logout
                  </button>
                </li>

                <li>
                  <div>
                    <UserCircle
                      className="text-black cursor-pointer"
                      onClick={toggleProfileDropdown}
                    />
                    <div
                      ref={ref}
                      role="tooltip"
                      className="absolute right-[2rem] mr-6 z-10 text-sm transition-opacity duration-300 bg-gray-500 text-black border border-gray-200 rounded-lg shadow-sm hidden dark:text-gray-400"
                    >
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-extrabold text-white">
                            {userName}
                          </span>
                        </div>
                        <div className="flex py-4">
                          <button onClick={handleCopyId} className="mr-2">
                            <Copy />
                          </button>
                          <input
                            ref={copyId}
                            id="copyInput"
                            className="flex-1 w-32 outline-none p-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-50"
                            type="text"
                            value={id && id}
                            readOnly
                          />
                        </div>

                        <ul className="flex text-sm mt-4">
                          <li className="mr-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {friendsCount}
                            </span>
                            {friendsCount == 1 ? (
                              <span>&nbsp;Friend</span>
                            ) : (
                              <span>&nbsp;Friends</span>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          )}

          <MobileMenu
            userName={userName}
            handleCopyId={handleCopyId}
            id={id}
            friendsCount={friendsCount}
            copyId={copyId}
            user={user}
            isTokenExpired={isTokenExpired}
          />
        </div>
      </div>
    </header>
  );
}
