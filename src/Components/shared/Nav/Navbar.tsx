"use client";

import Image from "next/image";
import React from "react";
import Logo from "../../../assets/logo-icon.png";
import Link from "next/link";
import NaveLinks from "./NavLinks";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <nav className="navbar bg-white border border-gray-100 shadow-sm px-4 sm:px-8">
      <div className="container mx-auto flex flex-col w-full">
        <div className="flex justify-between items-center w-full py-2">
          <div className="flex items-center gap-3">
            <div className="dropdown lg:hidden">
              <div tabIndex={0} role="button" className="btn btn-ghost p-1">
                <svg
                  aria-label="Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow-md border border-gray-100"
              >
                <NaveLinks isMobile={true} />
              </ul>
            </div>
            <Link href="/">
              <div className="flex items-center gap-4">
                <Image
                  className="w-10 h-10 bg-green-700 rounded-lg p-1"
                  src={Logo}
                  alt="Logo"
                  width={50}
                  height={50}
                />
                <div>
                  <h1 className="text-xl font-extrabold text-gray-800">
                    বাজার দর
                  </h1>
                  <p
                    className="text-xs sm:text-sm text-gray-600"
                    suppressHydrationWarning
                  >
                    {date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/sign-in" className="btn btn-ghost rounded-lg">
              সাইন ইন
            </Link>
            <Link
              href="/sign-up"
              className="btn bg-green-700 hover:bg-green-800 text-white rounded-lg ml-2"
            >
              সাইন আপ
            </Link>
          </div>
        </div>
        <div className="hidden lg:flex w-full border-t border-gray-100 items-center justify-start pt-3">
          <NaveLinks isMobile={false} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
