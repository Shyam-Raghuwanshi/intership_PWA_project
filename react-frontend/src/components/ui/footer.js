import React from "react";
// import Logo from "../../public/images/features-bg.png";
import { Instagram, Github, Twitter } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="absolute -bottom-20 w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
       
        {/* Bottom area */}
        <div className="md:flex md:items-center md:justify-between py-4 md:py-8 border-t border-gray-200">
          {/* Social as */}
          <ul className="flex mb-4 md:order-1 md:ml-4 md:mb-0">
            <li>
              <a
                href="https://twitter.com/ShyamRa36109329"
                className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Twitter"
              >
               <Twitter/>
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://github.com/shyamraghu"
                className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
               <Github/>
              </a>
            </li>
            <li className="ml-4">
              <a
                href="https://instagram.com/shyam_raghuonec"
                className="flex justify-center items-center text-gray-600 hover:text-gray-900 bg-white hover:bg-white-100 rounded-full shadow transition duration-150 ease-in-out"
                aria-label="Github"
              >
               <Instagram/>
              </a>
            </li>
          </ul>

          {/* Copyrights note */}
          <div className="text-sm text-gray-600 mr-4">
            &copy; PWAProject. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}