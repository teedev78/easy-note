"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Note = {
  _id: number;
  userId: number;
  title: string;
  author: string;
  content: string;
  category: string;
  tag: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
};

function NoteHistoryRead({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [note, setNote] = useState<Note>();
  const { id } = params;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSession(null);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setSession(user);
  }, []);

  const fetchNote = async () => {
    const token = await JSON.parse(localStorage.getItem("token")!);
    axios
      .get(`${process.env.NEXT_PUBLIC_NOTE_EASY_API}/note/history/read/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setNote(res.data.note);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchNote();
  }, []);

  return (
    <>
      <header className="bg-slate-600 text-white w-full h-[50px]">
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
      </header>
      <main className="bg-slate-500 w-[1024px] m-auto min-h-[calc(100vh-50px)]">
        {note ? (
          <div className="w-[714px] h-full m-auto pt-4 flex flex-col justify-center items-start">
            <h1 className="w-full text-3xl font-medium text-white p-2 border-b-2 border-gray-600">
              Title: {note.title}
            </h1>
            <div className="w-full p-2 text-white border-b-2 border-gray-600 flex flex-row justify-between items-center">
              <p className="text-sm">Created by {note.author}</p>
              <div>
                <button
                  onClick={() => router.push(`/notes/history/${note.slug}`)}
                  className="bg-blue-500 border-2 border-blue-600 text-white rounded-md py-1 px-2 mr-2"
                >
                  History
                </button>
                <button
                  onClick={() => router.push(`/notes/${note.slug}/edit`)}
                  className="bg-green-500 border-2 border-green-600 text-white rounded-md py-1 px-2"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="bg-[#d6d6d6] w-full min-h-[calc(100vh-200px)] mt-2 p-4">
              <p className="">{note.content}</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </main>
    </>
  );
}

export default NoteHistoryRead;
