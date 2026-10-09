import React, { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { apiBaseUrl2 } from "@/Services/apiBaseUrl";
import MiniProductCard from "@/Components/shared/MiniProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}
const engToBng = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => banglaDigits[parseInt(d)])
    .replace(".", ".");
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
        <h1 className="text-2xl font-bold text-gray-800">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি!</h1>
        <Link href="/" className="text-[#107c41] hover:underline font-medium">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <div className="w-18 h-18 rounded-full bg-[#F4F6F4] flex items-center justify-center text-4xl border border-gray-100/50 shadow-inner">
          {categoryInfo.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{categoryInfo.nameBn}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {engToBng(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      {/* Sort / Filter Section */}
      <div className="bg-white border border-gray-100 rounded-xl px-6 py-4 shadow-sm flex justify-end items-center">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-600">সাজান</span>
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500">
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
        {products.map((product) => (
          <MiniProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function CategoryPage({ params }: PageProps) {
  return (
    <div className="min-h-screen bg-[#F0F5F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={
          <div className="flex justify-center py-20 text-gray-500 font-medium">
            ক্যাটাগরি লোড হচ্ছে...
          </div>
        }>
          <CategoryDetailsFetcher params={params} />
        </Suspense>
      </div>
    </div>
  );
}