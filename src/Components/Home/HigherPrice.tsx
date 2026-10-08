"use client";

import React from "react";
import { useProducts } from "@/context/AllProductContext";
import HomeProductCard from "./HomeProductCard";

const HigherPrice = () => {
  const { products, loading } = useProducts();
  const higherProducts = products.filter((p) => p.change.dir === "up");

  if (loading) {
    return <div className="text-center py-6 text-gray-500">loading higher-priced products...</div>;
  }

  return (
    <section className="container mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-red-600 text-lg">▲</span>
        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {higherProducts.map((product) => (
          <HomeProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HigherPrice;