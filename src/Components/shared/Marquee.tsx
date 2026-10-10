"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/AllProductContext";

const convertToBengaliNumber = (num: number | string): string => {
  const englishToBengaliDigits: { [key: string]: string } = {
    "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪",
    "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯",
  };
  return num.toString().replace(/[0-9]/g, (digit) => englishToBengaliDigits[digit]);
};

const formatUnit = (unit: string): string => {
  if (unit === "kg") return "কেজি";
  if (unit === "litre") return "লিটার";
  if (unit === "piece") return "পিস";
  return unit;
};

const Marquee = () => {
  const { products, loading } = useProducts();
  const router = useRouter();

  if (loading) {
    return (
      <div className="bg-white border-y border-gray-100 py-3 overflow-hidden whitespace-nowrap relative shadow-sm pointer-events-auto">
        <div className="inline-flex animate-pulse items-center gap-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-3 px-4 border-r border-gray-200"
            >
              {/* Icon Skeleton */}
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
              {/* Product Name Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              {/* Price Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              {/* Change % Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const handleNavigation = (id: string | number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="bg-white border-y border-gray-100 py-3 overflow-hidden whitespace-nowrap relative shadow-sm pointer-events-auto">
      <div className="inline-flex animate-marquee items-center gap-10 hover:pause">
        {[...products, ...products].map((product, index) => {
          const isUp = product.change.dir === "up";
          const formattedPrice = convertToBengaliNumber(product.today);
          const formattedPct = convertToBengaliNumber(product.change.pct);
          const unitName = formatUnit(product.unit);

          return (
            <div
              key={`${product.id}-${index}`}
              onClick={() => handleNavigation(product.id)}
              className="relative z-10 pointer-events-auto inline-flex items-center gap-2 text-sm text-gray-700 px-4 border-r border-gray-200 hover:text-green-700 transition-colors cursor-pointer"
            >
              <span className="text-base">
                {product.image || product.categoryIcon}
              </span>
              <span className="font-medium text-gray-800">
                {product.nameBn}
              </span>
              <span className="font-semibold text-gray-900">
                {formattedPrice} টাকা/{unitName}
              </span>
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
                  isUp ? "text-red-600" : "text-green-600"
                }`}
              >
                <span>{isUp ? "▲" : "▼"}</span>
                {formattedPct}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Marquee;