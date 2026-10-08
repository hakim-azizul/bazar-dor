"use client";

import React from "react";
import { useProducts } from "@/context/AllProductContext";
import HomeProductCard from "./HomeProductCard";

const LowerPrice = () => {
  const { products, loading } = useProducts();
  const lowerProducts = products.filter((p) => p.change.dir === "down");

  if (loading) {
    return <div className="text-center py-6 text-gray-500">loading lower-priced products...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-green-600 text-lg">▼</span>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          আজ দাম কমেছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {lowerProducts.map((product) => (
          <HomeProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default LowerPrice;
