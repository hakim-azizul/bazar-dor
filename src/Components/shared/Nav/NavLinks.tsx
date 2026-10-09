"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { apiBaseUrl2 } from "@/Services/apiBaseUrl";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface NavLinksProps {
  isMobile?: boolean;
}

const NaveLinks = ({ isMobile = false }: NavLinksProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiBaseUrl2}/categories`,);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("ক্যাটাগরি ফেচ করতে সমস্যা হয়েছে:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <li className="p-2 text-gray-500 text-sm">লোড হচ্ছে...</li>;
  }
  if (isMobile) {
    return (
      <>
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link href={`/category/${cat.slug}`}>
              <span>{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          </li>
        ))}
      </>
    );
  }
  return (
    <ul className="flex items-center gap-4 font-medium text-gray-700 overflow-x-auto">
      {categories.map((cat) => {
        const categoryPath = `/category/${cat.slug}`;
        const isActive = pathname === categoryPath;

        return (
          <li key={cat.id}>
            <Link
              href={categoryPath}
              className={`flex justify-start items-center gap-2 px-2 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#107c41] text-white shadow-sm font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span>{cat.nameBn}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NaveLinks;
