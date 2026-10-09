"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import { Button, Form, Input, Label, TextField } from "@heroui/react";

const ProfileUpdatePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    try {
      const { error } = await updateUser({
        name: name,
      });

      if (error) {
        setErrorMessage(error.message || "তথ্য আপডেট করতে সমস্যা হয়েছে।");
      } else {
        setSuccessMessage("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
        setTimeout(() => {
          router.push("/profile");
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("কোথাও কোনো সমস্যা হয়েছে।");
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

          {successMessage && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg text-center">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
              {errorMessage}
            </div>
          )}

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