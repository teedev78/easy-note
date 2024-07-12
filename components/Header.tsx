"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Header() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSession(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setSession(user);
  }, []);

  return (
    <main className="bg-slate-600 text-white w-full h-[50px]">
      <div className="w-[1024px] h-full m-auto p-1 flex flex-row justify-between items-center">
        <div
          onClick={() => router.push("/")}
          className="text-2xl hover:cursor-pointer"
        >
          Easy Note
        </div>
        {!session ? (
          <div>
            <button
              onClick={() => router.push("/login")}
              className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded-md border-2 border-gray-800"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="text-white flex flex-row justify-center items-center">
            {/* <div>{user.name}</div> */}
            <button
              onClick={() => {
                logout();
              }}
              className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 ml-2 rounded-md border-2 border-gray-800"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Header;
