import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#F0F5F0] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1f2937]">
          Sorry This product is not available!
        </h2>
        
        <Link
          href="/"
          className="inline-block text-[#107c41] hover:text-[#0d6535] font-medium transition-colors"
        >
          ← Get back to home
        </Link>
      </div>
    </div>
  );
}