"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Notes = {
  _id: string;
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

function NoteHistory({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const [notesList, setNotesList] = useState<Notes[]>([]);
  const [lastNote, setLastNote] = useState<Notes>();
  const [session, setSession] = useState(null);

  const fetchNotesList = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_NOTE_EASY_API}/note/history/${id}`)
      .then((res) => {
        setLastNote(res.data.lastNote);
        setNotesList(res.data.noteHistory);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchNotesList();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSession(null);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")!);
    setSession(user);
  }, []);

  const arrangeHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const arrangeType: string = e.target.value;
    console.log(arrangeType);

    if (arrangeType === "note:oldToNew") {
      notesList.sort((a, b) => {
        const nameA = a._id.toUpperCase();
        const nameB = b._id.toUpperCase();

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    } else if (arrangeType === "note:newToOld") {
      notesList.sort((a, b) => {
        const nameA = a._id.toUpperCase();
        const nameB = b._id.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (arrangeType === "name:AtoZ") {
      notesList.sort((a, b) => {
        const nameA = a.author.toUpperCase();
        const nameB = b.author.toUpperCase();

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    } else if (arrangeType === "name:ZtoA") {
      notesList.sort((a, b) => {
        const nameA = a.author.toUpperCase();
        const nameB = b.author.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    }

    setNotesList([...notesList]);
  };

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
      <main className="bg-slate-500 text-white w-[1024px] m-auto p-4">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-full text-right">
            <button
              onClick={() => router.push("/notes/create")}
              className="bg-green-300 hover:bg-green-200 border-2 border-green-500 text-black rounded-md px-2 py-1 mb-3"
            >
              Create
            </button>
          </div>
          <h1 className="text-2xl font-medium mb-4">Current Note</h1>
          {lastNote !== undefined ? (
            <>
              <div
                key={lastNote._id}
                onClick={() => router.push(`/notes/${lastNote.slug}`)}
                className="border-2 border-gray-400 w-full mb-3 p-2 rounded-md hover:bg-slate-400 hover:cursor-pointer"
              >
                <h2 className="font-medium text-xl">{lastNote.title}</h2>
                <p>{lastNote.content}</p>
                <p>Created by: {lastNote.author}</p>
                <p>
                  Created date: {new Date(lastNote.createdAt).toDateString()}{" "}
                  {new Date(lastNote.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <h1 className="text-2xl border-t-2 w-full text-center pt-5 font-medium mb-4">
                Note History
              </h1>
              <div className="w-full text-right mb-3">
                เรียงตาม:
                <button className="bg-white text-gray-500 border-2 border-gray-300 rounded-md p-1 ml-2">
                  <select onChange={(e) => arrangeHandle(e)}>
                    <option value="note:newToOld">Note: Old - New</option>
                    <option value="note:oldToNew">Note: New - Old</option>
                  </select>
                </button>
              </div>

              <ul className="w-full">
                {notesList.map((note: Notes) => (
                  <li
                    key={note._id}
                    onClick={() =>
                      router.push(`/notes/history/read/${note._id}`)
                    }
                    className="border-2 border-gray-400 w-full mb-3 p-2 rounded-md hover:bg-slate-400 hover:cursor-pointer"
                  >
                    <h2 className="font-medium text-xl">{note.title}</h2>
                    <p>{note.content}</p>
                    <p>Created by: {note.author}</p>
                    <p>
                      Edited date: {new Date(note.createdAt).toDateString()}{" "}
                      {new Date(note.createdAt).toLocaleTimeString()}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </main>
    </>
  );
}

export default NoteHistory;
