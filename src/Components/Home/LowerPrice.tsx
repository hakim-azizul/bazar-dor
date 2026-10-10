"use client";

import React from "react";
import { useProducts } from "@/context/AllProductContext";
import MiniProductCard from "../shared/MiniProductCard";
import MiniProductSkeleton from "@/Components/Home/MiniProductSkeleton";

const LowerPrice = () => {
  const { products, loading } = useProducts();
  
  const lowerProducts = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 text-lg">▼</span>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <MiniProductSkeleton key={index} />
            ))
          : lowerProducts.map((product) => (
              <MiniProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
};

export default LowerPrice;