"use client";
import { useState, useRef, useEffect } from "react";
import { Transition } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import { Copy, UserCircle } from "lucide-react";

function MobileMenu({ userName, handleCopyId, id, friendsCount, copyId, user, isTokenExpired }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const ref = useRef(null);
  const trigger = useRef(null);
  const mobileNav = useRef(null);

  const toggleProfileDropdown = () => {
    ref.current.classList.toggle("hidden");
  };
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [mobileNavOpen]);

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [mobileNavOpen]);

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen ? "active" : ""}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-900"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" />
          <rect y="11" width="24" height="2" />
          <rect y="18" width="24" height="2" />
        </svg>
      </button>

      {/*Mobile navigation */}
      <div ref={mobileNav}>
        <Transition
          show={mobileNavOpen}
          as="nav"
          id="mobile-nav"
          className="absolute top-full h-screen pb-16 z-20 left-0 w-full overflow-scroll bg-white"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ul className="px-5 py-2">
            {user && (
              <li className="">
                <UserCircle
                  className="text-black cursor-pointer text-center"
                  onClick={toggleProfileDropdown}
                />
                <div
                  ref={ref}
                  role="tooltip"
                  className="absolute mr-6 z-10 text-sm transition-opacity duration-300 bg-gray-500 text-black border border-gray-200 rounded-lg shadow-sm hidden dark:text-gray-400"
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
              </li>
            )}
            {!user && (
              <li onClick={isTokenExpired}>
                <Link
                  href="/signin"
                  className="flex font-medium w-full text-gray-600 hover:text-gray-900 py-2 justify-center"
                  onClick={() => setMobileNavOpen(false)}
                >
                  Sign in
                </Link>
              </li>
            )}
            {!user && (
              <li onClick={isTokenExpired}>
                <Link
                  href="/signup"
                  className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 w-full my-2"
                  onClick={() => setMobileNavOpen(false)}
                >
                  <span>Sign up</span>
                  <svg
                    className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1"
                    viewBox="0 0 12 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                      fill="#999"
                      fillRule="nonzero"
                    />
                  </svg>
                </Link>
              </li>
            )}
          </ul>
        </Transition>
      </div>
    </div>
  );
}

export default MobileMenu;
