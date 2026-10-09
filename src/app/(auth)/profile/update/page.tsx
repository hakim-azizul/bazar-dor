"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import { Button, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      const { error } = await updateUser({
        name: name,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।", {
          position: "top-right",
          autoClose: 1000,
        });

        // এরর হলে ১ সেকেন্ড পর পেজ রিলোড হবে
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!", {
          position: "top-right",
          autoClose: 1000,
        });

        // সাকসেস হলে ১ সেকেন্ড পর প্রোফাইল পেজে রিডাইরেক্ট হবে
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 1000);
      }
    } catch {
      toast.error("কোথাও কোনো সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 1000,
      });

      // এরর হলে ১ সেকেন্ড পর পেজ রিলোড হবে
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] flex items-center justify-center">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Heading */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/profile" className="text-sm text-[#107c41] hover:underline font-medium">
              ← প্রোফাইলে ফিরে যান
            </Link>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900">প্রোফাইল আপডেট</h1>
          <p className="text-sm text-gray-600 mt-1">
            আপনার অ্যাকাউন্টের তথ্য পরিবর্তন করুন।
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>

          <Form className="flex flex-col gap-6 w-full" onSubmit={handleUpdate}>
            <TextField 
              defaultValue={session?.user?.name || ""}
              className="w-full flex flex-col gap-1"
            >
              <Label className="block text-sm font-medium text-gray-700">
                নাম
              </Label>
              <Input
                name="name"
                placeholder="আপনার নাম লিখুন"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm"
                required
              />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full bg-[#107c41] hover:bg-[#0d6535] text-white font-medium py-3 rounded-xl transition-all shadow-sm text-sm"
            >
              {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
            </Button>
          </Form>
        </div>

      </div>
    </div>
  );
};

export default ProfileUpdatePage;