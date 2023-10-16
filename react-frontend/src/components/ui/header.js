"use client";
import { useState, useEffect, useRef } from "react";
import MobileMenu from "./mobile-menu";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "flowbite";
export default function Header({ user, logout, setUser }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const [top, setTop] = useState(true);
  const [id, setId] = useState(null)
  const scrollHandler = () => {
    window.pageYOffset > 10 ? setTop(false) : setTop(true);
  };

  useEffect(() => {
    scrollHandler();
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  const toggleProfileDropdown = () => {
    ref.current.classList.toggle("hidden");
  };

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top ? "text-white backdrop-blur-sm shadow-lg" : ""
      }`}
    >
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
                <li>
                  <Link
                    to={"/signin"}
                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </li>
                <li>
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
                    <button
                      onClick={toggleProfileDropdown}
                      type="button"
                      class="text-white rounded-full bg-blue-700 p-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-xs text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      ID
                    </button>
                    <div
                      ref={ref}
                      role="tooltip"
                      class="absolute mr-6 z-10 text-sm transition-opacity duration-300 bg-gray-500 text-black border border-gray-200 rounded-lg shadow-sm hidden dark:text-gray-400"
                    >
                      <div class="p-3">
                        <div class="flex items-center justify-between mb-2">
                          <span className="font-bold">Name</span>
                          <div>
                            <button
                              type="button"
                              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            >
                              View Friends
                            </button>
                          </div>
                        </div>
                        <div class="flex py-4">
                          <button
                            class=" bg-blue-500 p-1 hover:bg-blue-700 text-white font-bold rounded"
                            onclick="copyToClipboard()"
                          >
                            <small>Copy</small>
                          </button>
                          <input
                            id="copyInput"
                            class="flex-1 outline-none p-1 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            type="text"
                            value={id}
                            readonly
                            disabled
                          />
                        </div>

                        <ul class="flex text-sm mt-4">
                          <li class="mr-2">
                            <a href="#" class="hover:underline">
                              <span class="font-semibold text-gray-900 dark:text-white">
                                799
                              </span>
                              <span className="">Friends</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </nav>
          )}

          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
