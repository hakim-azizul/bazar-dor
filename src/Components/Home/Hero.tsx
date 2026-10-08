"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImage from "@/assets/bazar-hero.png";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-start max-w-xl">
          <div
            className="bg-[#E8F5E9] text-[#1B5E20] px-4 py-1.5 rounded-full text-xs font-medium mb-4"
            suppressHydrationWarning
          >
            {date}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <button
            onClick={() => {
              const element = document.getElementById("all-products");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-[#107c41] hover:bg-[#0d6535] text-white font-medium px-6 py-3 rounded-xl transition-all shadow-sm text-sm cursor-pointer"
          >
            সব পণ্য দেখুন
          </button>
        </div>

        {/* Dan pasher image ongsho */}
        <div className="flex items-center justify-center relative w-full md:w-auto">
          <Image
            src={HeroImage}
            alt="Bazar Hero Image"
            width={400}
            height={400}
            className="object-contain max-w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
