"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] flex items-center justify-center">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-700">দয়া করে প্রথমে সাইন ইন করুন।</p>
        <Link href="/signin" className="bg-[#107c41] text-white px-4 py-2 rounded-lg text-sm font-medium">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Heading */}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-600 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#107c41] text-white text-xl font-bold">
                  {session.user.name?.[0] || "U"}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {session.user.name}
              </h2>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          <Button
            onPress={handleSignOut}
            variant="outline"
            className="border-red-200 text-red-600 hover:bg-red-50 font-medium px-4 py-2 rounded-xl text-sm flex items-center gap-2"
          >
            <span>←</span> সাইন আউট
          </Button>
        </div>

        {/* Navigation Card to Update Route */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">তথ্য ব্যবস্থাপনা</h3>
            <p className="text-sm text-gray-500 mt-0.5">আপনার নাম বা অন্যান্য প্রোফাইল তথ্য পরিবর্তন করতে আপডেট করুন।</p>
          </div>
          <Link
            href="/profile/update"
            className="bg-[#107c41] hover:bg-[#0d6535] text-white font-medium px-6 py-2.5 rounded-xl transition-all shadow-sm text-sm"
          >
            আপডেট করুন
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;