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
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!", {
          position: "top-right",
          autoClose: 1000,
        });
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
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#F0F5F0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">

          <div>
            <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-9 w-48 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="h-6 w-16 bg-gray-200 rounded-md mb-6"></div>
            
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-1">

                <div className="h-4 w-12 bg-gray-200 rounded mb-1"></div>

                <div className="h-10.5 w-full bg-gray-100 rounded-lg"></div>
              </div>

              <div className="h-12 w-full bg-gray-200 rounded-xl mt-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F5F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
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