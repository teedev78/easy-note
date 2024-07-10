"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import noteData from "../../data/notes.json";

type Notes = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};



function Notes() {
  const router = useRouter();
  const notes: Notes[] = JSON.parse(JSON.stringify(noteData.notes));

  const [notesList, setNotesList] = useState<Notes[]>(notes);

  const readNote = (note: Notes) => {
    router.push(`/notes/${note.id}`);
  };

  const arrangeHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const arrangeType: string = e.target.value;

    if (arrangeType === "note:newToOld") {
      notes.sort((a, b) => b.id - a.id);
    } else if (arrangeType === "note:oldToNew") {
      notes.sort((a, b) => a.id - b.id);
    } else if (arrangeType === "name:AtoZ") {
      notes.sort((a, b) => {
        const nameA = a.userName.toUpperCase();
        const nameB = b.userName.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    } else if (arrangeType === "name:ZtoA") {
      notes.sort((a, b) => {
        const nameA = a.userName.toUpperCase();
        const nameB = b.userName.toUpperCase();

        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        return 0;
      });
    }

    setNotesList([...notes]);
  };

  return (
    <main className="bg-slate-500 text-white w-[1024px] m-auto h-[calc(100vh-50px)] p-5">
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-2xl font-medium mb-4">รายการโน๊ตทั้งหมด</h1>
        <div className="w-full text-right mb-3">
          เรียงตาม:
          <button className="bg-white text-gray-500 border-2 border-gray-300 rounded-md p-1 ml-2">
            <select onChange={(e) => arrangeHandle(e)}>
              <option value="note:newToOld">โน๊ต: ใหม่ - เก่า</option>
              <option value="note:oldToNew">โน๊ต: เก่า - ใหม่</option>
              <option value="name:AtoZ">ชื่อผู้สร้าง: A - Z</option>
              <option value="name:ZtoA">ชื่อผู้สร้าง: Z - A</option>
            </select>
          </button>
        </div>
        <ul className="w-full">
          {notesList.map((note: Notes) => (
            <li
              key={note.id}
              onClick={() => readNote(note)}
              className="border-2 border-gray-400 w-full mb-3 p-2 rounded-md hover:bg-slate-400 hover:cursor-pointer"
            >
              <h2 className="font-medium text-xl">{note.title}</h2>
              <p>
                {note.note}
              </p>
              <p>ชื่อผู้เขียน: {note.userName}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default Notes;
