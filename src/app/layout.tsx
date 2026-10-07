import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/shared/Nav/Navbar";
import Footer from "@/Components/shared/Footer";

const Siliguri = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "Bangladeshi daily necessities price tracking website",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" 
    data-theme="light"
    className={`${Siliguri.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F0F5F0]">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
