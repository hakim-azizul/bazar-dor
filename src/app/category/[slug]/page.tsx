import React, { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { apiBaseUrl2 } from "@/Services/apiBaseUrl";
import CategoryProductList from "@/Components/CategoryProductList";
import MiniProductSkeleton from "@/Components/Home/MiniProductSkeleton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CategorySkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-4 min-h-[100px]">
        <div className="w-16 h-16 bg-gray-100 rounded-full shrink-0"></div>
        <div className="space-y-3 w-full">
          <div className="h-6 bg-gray-200 rounded-md w-32"></div>
          <div className="h-4 bg-gray-100 rounded-md w-48"></div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-end items-center mb-6 min-h-[70px]">
        <div className="h-10 bg-gray-100 rounded-lg w-48"></div>
      </div>

      <div className="h-4 bg-gray-200 rounded-md w-40 mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <MiniProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

async function CategoryDetailsFetcher({ params }: PageProps) {
  const { slug } = await params;

  let products: Product[] = [];
  let categoryInfo = null;

  try {
    const response = await fetch(`${apiBaseUrl2}/products`, {
      next: { revalidate: 60 },
    });
    if (response.ok) {
      const allProducts: Product[] = await response.json();
      products = allProducts.filter((p) => p.category === slug);

      if (products.length > 0) {
        categoryInfo = {
          nameBn: products[0].categoryNameBn,
          icon: products[0].categoryIcon,
        };
      }
    }
  } catch (error) {
    console.error("Category products fetch error:", error);
  }

  if (!products.length || !categoryInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!
        </h1>
        <Link href="/" className="text-[#107c41] hover:underline font-medium">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }
  
  return (
    <CategoryProductList products={products} categoryInfo={categoryInfo} />
  );
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-[#F0F5F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<CategorySkeleton />}>
          <CategoryDetailsFetcher params={params} />
        </Suspense>
      </div>
    </div>
  );
}