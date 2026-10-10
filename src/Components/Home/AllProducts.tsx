"use client";

import React from "react";
import { useProducts } from "@/context/AllProductContext";
import MiniProductCard from "../shared/MiniProductCard";
import MiniProductSkeleton from "@/Components/Home/MiniProductSkeleton";

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

const AllProducts = () => {
  const { products, loading } = useProducts();

  const totalProductsCount = convertToBengaliNumber(products.length);

  return (
    <section id="all-products" className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
          সব পণ্য
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          {loading ? "পণ্য লোড হচ্ছে..." : `মোট ${totalProductsCount}টি পণ্য দেখানো হচ্ছে`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ?
            Array.from({ length: 6 }).map((_, index) => (
              <MiniProductSkeleton key={index} />
            ))
          :
            products.map((product) => (
              <MiniProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default AllProducts;