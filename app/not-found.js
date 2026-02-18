"use client";
import Footer from "@/components/Shared/Footer/Footer";
import Header from "@/components/Shared/Header/Header";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
    <Header/>
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">পেজ পাওয়া যায়নি</p>
        <Link href="/" className="text-blue-600 hover:underline">হোমপেজে ফিরে যান</Link>
      </div>
    </div>
    <Footer/>
    </>
  );
}
