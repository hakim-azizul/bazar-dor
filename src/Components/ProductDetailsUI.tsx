import React from "react";
import { Product } from "@/types/product";

// ইংরেজি সংখ্যাকে বাংলায় কনভার্ট করার হেল্পার ফাংশন
const engToBng = (num: number | string) => {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (d) => banglaDigits[parseInt(d)])
    .replace(".", "."); // দশমিক থাকলে ঠিক রাখবে
};

export default function ProductDetailsUI({ product }: { product: Product }) {
  const minPrices = product.markets?.map((m) => m.min) || [0];
  const maxPrices = product.markets?.map((m) => m.max) || [0];

  const overallMin = Math.min(...minPrices);
  const overallMax = Math.max(...maxPrices);
  const avgPrice = Math.round((overallMin + overallMax) / 2);

  const isUp = product.change?.dir === "up";
  const changePct = product.change?.pct || 0;
  const priceDiff = Math.abs(product.today - product.yesterday);

  return (
    <div className="space-y-6">
      {/* Top Card */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 rounded-xl bg-[#F4F6F4] flex items-center justify-center text-4xl border border-gray-100/50 shadow-inner">
            {product.image || product.categoryIcon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {product.nameBn}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              প্রতি কেজি - {product.categoryNameBn}
            </p>
            <p className="text-sm text-gray-600 mt-3">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold text-gray-900">
                {isUp ? "বেড়েছে" : "কমেছে"}
              </span>{" "}
              - {engToBng(priceDiff)} টাকা
            </p>
          </div>
        </div>

        <div className="bg-[#F7F9F7] border border-gray-100 px-8 py-4 rounded-xl text-center min-w-35">
          <span className="text-xs text-gray-500 font-medium">আজকের দাম</span>
          <div className="mt-1">
            <span className="text-3xl font-black text-gray-900">
              {engToBng(product.today)}
            </span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">টাকা / কেজি</p>
          <p
            className={`text-xs font-bold mt-1.5 flex items-center justify-center gap-1 ${isUp ? "text-red-500" : "text-[#107c41]"}`}
          >
            {isUp ? "▲" : "▼"} {engToBng(changePct)}%
          </p>
        </div>
      </div>

      {/* Main Bottom Section (Summary + Table) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Price Summary Section */}
        <div className="mb-10">
          <h2 className="text-[17px] font-bold text-gray-800 mb-5">
            দামের সারসংক্ষেপ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
              <p className="text-[22px] font-bold text-[#107c41] mt-1.5">
                {engToBng(overallMin)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-1.5">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
              <p className="text-[22px] font-bold text-red-500 mt-1.5">
                {engToBng(overallMax)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-1.5">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="border border-gray-200 rounded-xl p-5">
              <p className="text-xs text-gray-500">গড় দাম</p>
              <p className="text-[22px] font-bold text-[#107c41] mt-1.5">
                {engToBng(avgPrice)}{" "}
                <span className="text-sm font-medium">টাকা</span>
              </p>
              <p className="text-[11px] text-gray-500 mt-1.5">
                প্রতি কেজি-এর হিসাব
              </p>
            </div>
          </div>
        </div>

        {/* Markets Table Section */}
        <div>
          <h2 className="text-[17px] font-bold text-gray-800 mb-5">
            বাজারভিত্তিক আজকের দাম
          </h2>

          {/* Table er bairer border */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse min-w-150">
              <thead className="bg-[#F9FAFB] border-b border-gray-200">
                <tr>
                  <th className="py-4 px-5 text-[14px] font-semibold text-gray-600">
                    বাজার
                  </th>
                  <th className="py-4 px-5 text-[14px] font-semibold text-gray-600">
                    বিভাগ
                  </th>
                  <th className="py-4 px-5 text-[14px] font-semibold text-gray-600">
                    সর্বনিম্ন
                  </th>
                  <th className="py-4 px-5 text-[14px] font-semibold text-gray-600">
                    সর্বাধিক
                  </th>
                  <th className="py-4 px-5 text-[14px] font-semibold text-gray-600 text-right">
                    গড়
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {product.markets?.map((item, index) => {
                  const itemAvg = Math.round((item.min + item.max) / 2);
                  return (
                    <tr
                      key={index}
                      className="border-b border-black last:border-0 odd:bg-white even:bg-[#F4F8F4] hover:bg-[#EBF1EB] transition-colors"
                    >
                      <td className="py-4 px-5 text-[14px] font-medium text-gray-800">
                        {item.market}
                      </td>
                      <td className="py-4 px-5 text-[14px] text-gray-600">
                        {item.division}
                      </td>
                      <td className="py-4 px-5 text-[14px] text-gray-700">
                        {engToBng(item.min)} টাকা
                      </td>
                      <td className="py-4 px-5 text-[14px] text-gray-700">
                        {engToBng(item.max)} টাকা
                      </td>
                      <td className="py-4 px-5 text-[14px] font-bold text-gray-900 text-right">
                        {engToBng(itemAvg)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
