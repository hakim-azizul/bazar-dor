import React, { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { apiBaseUrl2 } from "@/Services/apiBaseUrl";
import CategoryProductList from "@/Components/CategoryProductList";

interface PageProps {
  params: Promise<{ slug: string }>;
}

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
        <Suspense
          fallback={
            <div className="flex justify-center py-20 text-gray-500 font-medium">
              ক্যাটাগরি লোড হচ্ছে...
            </div>
          }
        >
          <CategoryDetailsFetcher params={params} />
        </Suspense>
      </div>
    </div>
  );
}
