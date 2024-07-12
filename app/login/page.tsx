"use client";
import Header from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post(`${process.env.NEXT_PUBLIC_NOTE_EASY_API}/login`, {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main className="bg-slate-600 text-white w-full h-[50px]">
        <div className="w-[1024px] h-full m-auto p-1 flex flex-row justify-between items-center">
          <div
            onClick={() => router.push("/")}
            className="text-2xl hover:cursor-pointer"
          >
            Easy Note
          </div>
        </div>
      </main>
      <main className="bg-slate-500 w-[1024px] m-auto h-[calc(100vh-50px)] p-5">
        <div className="flex flex-col justify-center items-center w-full">
          <form
            onSubmit={(e) => handleForm(e)}
            className="bg-gray-300 border-2 border-gray-300 p-5 mt-10 w-[500px]"
          >
            <h1 className="text-center text-3xl font-medium mb-10">Login</h1>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <br />
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-1 rounded-sm"
              />
            </div>
            <div className="mb-2">
              <label htmlFor="password">Password</label>
              <br />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-1 rounded-sm"
              />
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-400 text-white border-2 border-gray-700 rounded-md p-2 w-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
