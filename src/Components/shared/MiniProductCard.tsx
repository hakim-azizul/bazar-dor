"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types/product";

interface HomeProductCardProps {
  product: Product;
}

const convertToBengaliNumber = (num: number | string): string => {
  const englishToBengaliDigits: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => englishToBengaliDigits[digit]);
};

const formatUnit = (unit: string): string => {
  if (unit === "kg") return "প্রতি কেজি";
  if (unit === "litre") return "প্রতি লিটার";
  if (unit === "piece") return "প্রতি পিস";
  if (unit === "dozen") return "প্রতি ডজন";
  return `প্রতি ${unit}`;
};

const HomeProductCard: React.FC<HomeProductCardProps> = ({ product }) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isZero = product.change.pct === 0;

  const formattedPrice = convertToBengaliNumber(product.today);
  const formattedPct = convertToBengaliNumber(product.change.pct);
  const unitName = formatUnit(product.unit);

  // বাইরের div-কে Link দিয়ে রিপ্লেস করে href অ্যাড করা হয়েছে
  return (
    <Link
      href={`/products/${product.id}`}
      className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
    >
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-2xl border border-gray-100">
          {product.image || product.categoryIcon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">{unitName}</p>
        </div>
      </div>

      <div className="flex items-end justify-between pt-3 border-t border-gray-100">
        <div>
          <span className="text-xs text-gray-500 block mb-0.5">আজকের দাম</span>
          <span className="text-xl font-extrabold text-gray-900">
            {formattedPrice}{" "}
            <span className="text-sm font-normal text-gray-600">টাকা</span>
          </span>
        </div>

        <div
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold ${
            isZero
              ? "bg-gray-100 text-gray-600"
              : isUp
              ? "bg-red-50 text-red-600"
              : isDown
              ? "bg-green-50 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>{isZero ? "—" : isUp ? "▲" : isDown ? "▼" : ""}</span>
          <span>{formattedPct}%</span>
        </div>
      </div>
    </Link>
  );
};

export default HomeProductCard;