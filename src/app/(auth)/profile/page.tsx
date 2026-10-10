"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">

          <div>
            <div className="h-9 w-48 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
          </div>

          <div className="bg-white px-6 py-32 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full sm:w-auto">

              <div className="w-16 h-16 rounded-full bg-gray-200 shrink-0"></div>

              <div className="space-y-2 w-full">
                <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
                <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="h-10 w-28 bg-gray-200 rounded-xl flex-1 sm:flex-none"></div>
              <div className="h-10 w-28 bg-gray-200 rounded-xl flex-1 sm:flex-none"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center gap-4 relative">
        <ToastContainer />
        <p className="text-gray-700">দয়া করে প্রথমে সাইন ইন করুন।</p>
        <Link href="/signin" className="bg-[#107c41] text-white px-4 py-2 rounded-lg text-sm font-medium">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সফলভাবে সাইন আউট হয়েছেন!", {
              position: "top-right",
              autoClose: 1000,
            });
            setTimeout(() => {
              router.push("/signin");
              router.refresh();
            }, 1000);
          },
          onError: () => {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে।", {
              position: "top-right",
              autoClose: 1000,
            });
          }
        },
      });
    } catch {
      toast.error("কোথাও কোনো সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 1000,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-12 px-4 sm:px-6 lg:px-8 relative">
      <ToastContainer />
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-gray-600 mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>
        <div className="bg-white px-6 py-32 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
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
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/profile/update"
              className="flex-1 sm:flex-none text-center bg-[#107c41] hover:bg-[#0d6535] text-white font-medium px-5 py-2.5 rounded-xl transition-all shadow-sm text-sm"
            >
              আপডেট করুন
            </Link>

            <Button
              onPress={handleSignOut}
              variant="outline"
              className="flex-1 sm:flex-none border-red-200 text-red-600 hover:bg-red-50 font-medium px-5 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <span>←</span> সাইন আউট
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;