"use client";
import { useRouter } from "next/navigation";
import React from "react";

function Header() {
  const router = useRouter();

  return (
    <main className="bg-slate-600 text-white w-full h-[50px]">
      <div className="w-[1024px] h-full m-auto p-1 flex flex-row justify-between items-center">
        <div onClick={() => router.push("/")} className="text-2xl hover:cursor-pointer">
          Easy Note
        </div>
      </div>
    </main>
  );
}

export default Header;
