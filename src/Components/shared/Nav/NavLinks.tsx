"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavLinksProps {
  categories: Category[];
  isMobile?: boolean;
  loading?: boolean;
}

const NavLinks = ({ categories, isMobile = false, loading = false }: NavLinksProps) => {
  const pathname = usePathname();

  const getLinkClasses = (categoryPath: string) => {
    const isActive = pathname === categoryPath;
    if (isMobile) {
      return isActive 
        ? "bg-green-700 text-white font-semibold flex items-center gap-2 p-2 rounded-lg" 
        : "flex items-center gap-2 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all";
    }
    return isActive
      ? "bg-[#107c41] text-white shadow-sm font-semibold flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap"
      : "hover:bg-gray-100 text-gray-700 flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap transition-all";
  };
  if (loading) {
    return (
      <ul className={isMobile ? "flex flex-col gap-1 w-full" : "flex items-center gap-4 overflow-x-auto w-full"}>
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index} className="animate-pulse">
            <div
              className={
                isMobile
                  ? "flex items-center gap-2 p-2 rounded-lg"
                  : "flex items-center gap-2 px-3 py-1.5 rounded-xl whitespace-nowrap"
              }
            >
              <div className="w-5 h-5 bg-gray-200 rounded-md shrink-0"></div>
              <div className="h-4 bg-gray-200 rounded-md w-20 sm:w-24"></div>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={isMobile ? "flex flex-col gap-1" : "flex items-center gap-4 font-medium text-gray-700 overflow-x-auto"}>
      {categories.map((cat) => {
        const categoryPath = `/category/${cat.slug}`;
        return (
          <li key={cat.id}>
            <Link href={categoryPath} className={getLinkClasses(categoryPath)}>
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;