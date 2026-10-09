import React, { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/types/product";
import { apiBaseUrl2 } from "@/Services/apiBaseUrl"; // path thik kore nibe
import ProductDetailsUI from "@/Components/ProductDetailsUI";

interface PageProps {
  params: Promise<{ id: string }>;
}

// ১. eita holo amader Data Fetcher component jeta Suspense er vitore thakbe
async function ProductDataFetcher({ params }: PageProps) {
  // ekhane params await kora hocche, jeta ekta valid o safe way
  const { id } = await params;
  let product: Product | null = null;

  try {
    const response = await fetch(`${apiBaseUrl2}/products`, {
      next: { revalidate: 60 },
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
        <h1 className="text-2xl font-bold text-gray-800">product ti paoya jayni!</h1>
        <Link href="/" className="text-[#107c41] hover:underline font-medium">
          ← home page e fire jan
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb / Links */}
      <div className="text-sm text-gray-500 flex items-center gap-2 mb-6">
        <Link href="/" className="hover:text-gray-800 transition-colors">home</Link>
        <span>›</span>
        <Link href={`/category/${product.category}`} className="hover:text-gray-800 transition-colors">
          {product.categoryNameBn}
        </Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{product.nameBn}</span>
      </div>

      {/* UI Component ke call kora holo */}
      <ProductDetailsUI product={product} />
    </>
  );
}

// ২. Main Top-Level Page Component (Ekhane async / await params use kora jabena)
export default function ProductDetailPage({ params }: PageProps) {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* 
          Suspense add korar karone Next.js ar prerendering block korbe na. 
          Data load howar age ekhane fallback ui dekhabe.
        */}
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[40vh] text-gray-500 font-medium text-lg">
            product lod hocche...
          </div>
        }>
          <ProductDataFetcher params={params} />
        </Suspense>
        
      </div>
    </div>
  );
}