import React, { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { apiBaseUrl2 } from "@/Services/apiBaseUrl";
import ProductDetailsUI from "@/Components/ProductDetailsUI";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductSkeleton = () => {
  return (
    <div className="w-full animate-pulse">

      <div className="flex gap-2 mb-6">
        <div className="h-4 bg-gray-200 rounded w-12"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-4"></div>
        <div className="h-4 bg-gray-300 rounded w-20"></div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 min-h-40">
        <div className="flex items-center gap-6 w-full sm:w-auto">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl shrink-0"></div>
          <div className="space-y-3 w-full">
            <div className="h-8 bg-gray-200 rounded-md w-40"></div>
            <div className="h-4 bg-gray-100 rounded-md w-32"></div>
            <div className="h-4 bg-gray-100 rounded-md w-56"></div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 w-full sm:w-48 flex flex-col items-center gap-2">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-10 bg-gray-300 rounded w-16 my-1"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-5 bg-gray-200 rounded w-16 mt-1"></div>
        </div>
      </div>

      <div className="mb-8">
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm min-h-25">
              <div className="h-3 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="h-6 bg-gray-300 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-100 rounded w-32"></div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
             <div className="h-4 bg-gray-200 rounded w-20"></div>
             <div className="h-4 bg-gray-200 rounded w-16 hidden sm:block"></div>
             <div className="h-4 bg-gray-200 rounded w-16"></div>
             <div className="h-4 bg-gray-200 rounded w-16 hidden md:block"></div>
             <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex justify-between items-center p-4 border-b border-gray-50">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-4 bg-gray-100 rounded w-20 hidden sm:block"></div>
              <div className="h-4 bg-gray-100 rounded w-16"></div>
              <div className="h-4 bg-gray-100 rounded w-16 hidden md:block"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

async function ProductDataFetcher({ params }: PageProps) {
  const { id } = await params;
  let product: Product | null = null;

  try {
    const response = await fetch(`${apiBaseUrl2}/products`, {
      next: { revalidate: 30 },
    });
    if (response.ok) {
      const products: Product[] = await response.json();
      product = products.find((p) => p.id.toString() === id) || null;
    }
  } catch (error) {
    console.error("Product fetch error:", error);
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Sorry This product is not available!
        </h1>
        <Link href="/" className="text-[#107c41] hover:underline font-medium">
          ← Get back to home
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="text-sm text-gray-500 flex items-center gap-2 mb-6">
        <Link href="/" className="hover:text-gray-800 transition-colors">
          home
        </Link>
        <span>›</span>
        <Link
          href={`/category/${product.category}`}
          className="hover:text-gray-800 transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </div>
      <ProductDetailsUI product={product} />
    </>
  );
}

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[#F0F5F0]">
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDataFetcher params={params} />
        </Suspense>
      </div>
    </div>
  );
}