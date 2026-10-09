"use client";

import React, { useState } from "react";
import { Product } from "@/types/product";
import MiniProductCard from "@/Components/shared/MiniProductCard";

interface CategoryProductListProps {
  products: Product[];
  categoryInfo: {
    nameBn: string;
    icon: string;
  };
}
const engToBng = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => banglaDigits[parseInt(d)])
    .replace(".", ".");
};

export default function CategoryProductList({
  products,
  categoryInfo,
}: CategoryProductListProps) {
  const [sortOrder, setSortOrder] = useState<string>("default");
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return a.today - b.today;
    } else if (sortOrder === "price-desc") {
      return b.today - a.today;
    }
    return 0;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-18 h-18 rounded-full bg-[#F4F6F4] flex items-center justify-center text-4xl border border-gray-100/50 shadow-inner">
          {categoryInfo.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {categoryInfo.nameBn}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {engToBng(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm flex justify-end items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">সাজান</span>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          >
            <option value="default">ডিফল্ট</option>
            <option value="price-asc">দাম: কম থেকে বেশি</option>
            <option value="price-desc">দাম: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-600 font-medium">
          মোট {engToBng(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedProducts.map((product) => (
          <MiniProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
