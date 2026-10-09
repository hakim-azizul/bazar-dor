"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import person from "@/assets/person-fill.svg"
const UserMenu = () => {
  const { data: session, isPending } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/sign-in");
            router.refresh();
          },
        },
      });
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (isPending) {
    return <div className="text-xs text-gray-400">লোডিং...</div>;
  }

  if (!session) {
    return (
      <div>
        <Link
          href="/sign-in"
          className="btn btn-ghost rounded-lg text-sm font-medium text-gray-700"
        >
          সাইন ইন
        </Link>
        <Link
          href="/sign-up"
          className="btn bg-[#107c41] hover:bg-[#0d6535] text-white rounded-lg ml-2 text-sm font-medium shadow-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 focus:outline-none py-1 px-2 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
      >
        <Image
          src={
            user.image|| person
          }
          width={36}
          height={36}
          alt={user.name || "User"}
          className="w-9 h-9 rounded-full object-cover border border-gray-200"
        />
        <span className="font-semibold text-gray-800 text-sm">{user.name}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="mb-3 pb-3 border-b border-gray-100">
            <h4 className="font-bold text-gray-900 text-base">{user.name}</h4>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {user.email}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span className="text-base">👤</span>
              <span>আমার প্রোফাইল</span>
            </Link>

            <button
              onClick={() => {
                setIsOpen(false);
                handleSignOut();
              }}
              className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
            >
              <span className="text-base">↩</span>
              <span>সাইন আউট</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
