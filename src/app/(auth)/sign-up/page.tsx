"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const router = useRouter();
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGeneralError("");
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      setGeneralError("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলেনি!");
      toast.error("পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মিলেনি!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    setLoading(true);
    try {
      const { error: signUpError } = await signUp.email({
        name: data.name as string,
        email: data.email as string,
        password: data.password as string,
      });

      if (signUpError) {
        setGeneralError(signUpError.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে।");
        toast.error(signUpError.message || "রেজিস্ট্রেশন করতে সমস্যা হয়েছে।", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push("/sign-in");
          router.refresh();
        }, 1000);
      }
    } catch {
      setGeneralError("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      toast.error("কোথাও কোনো সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
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

  const handleGoogleSignUp = async () => {
    try {
      const { error } = await signIn.social({
        provider: "google",
      });
      
      if (error) {
        toast.error(error.message || "Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে।", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => window.location.reload(), 1000);
      }

    } catch {
      toast.error("Google দিয়ে সাইন আপ করতে সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => window.location.reload(), 1000);
    }
  };
  
  const handleGitHubSignUp = async () => {
    try {
      const { error } = await signIn.social({
        provider: "github",
      });

      if (error) {
        toast.error(error.message || "GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে।", {
          position: "top-right",
          autoClose: 1000,
        });

        setTimeout(() => window.location.reload(), 1000);
      }

    } catch {
      toast.error("GitHub দিয়ে সাইন আপ করতে সমস্যা হয়েছে।", {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5F0] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
        <p className="text-sm text-gray-600 mt-1">বিনামূল্যে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        {generalError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg text-center">
            {generalError}
          </div>
        )}
        <Form className="flex flex-col gap-4 w-full" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            validate={(value: string) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1">নাম</Label>
            <Input placeholder="যেমন: রহিম উদ্দিন" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value: string) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</Label>
            <Input placeholder="you@example.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value: string) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              return null;
            }}
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" type="password" />
            <Description className="text-xs text-gray-500 mt-1">
              কমপক্ষে ৮ অক্ষর হতে হবে।
            </Description>
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
          >
            <Label className="block text-sm font-medium text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input placeholder="আবার লিখুন" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm" type="password" />
            <FieldError className="text-xs text-red-500 mt-1" />
          </TextField>

          <div className="flex gap-2 mt-2">
            <Button 
              type="submit" 
              isDisabled={loading}
              className="w-full bg-[#107c41] hover:bg-[#0d6535] text-white font-medium py-2.5 rounded-lg transition-all shadow-sm text-sm"
            >
              {loading ? 'তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
            </Button>
          </div>
        </Form>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-500">অথবা</span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            onPress={handleGoogleSignUp}
            className="w-1/2 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-xs sm:text-sm font-medium text-gray-700 bg-white"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            Google
          </Button>

          <Button 
            onPress={handleGitHubSignUp}
            className="w-1/2 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all text-xs sm:text-sm font-medium text-gray-700 bg-white"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </Button>
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#107c41] font-semibold hover:underline">সাইন ইন করুন</Link>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;