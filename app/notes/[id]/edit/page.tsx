import React from "react";
import noteData from "@/data/notes.json";

type Notes = {
  id: number;
  userId: number;
  userName: string;
  title: string;
  note: string;
  createdAt: string;
  updatedAt: string;
};

function EditNote({ params }: { params: { id: string } }) {
  const { id } = params;
  const noteId = Number(id);
  const notes: Notes[] = JSON.parse(JSON.stringify(noteData.notes));
  const note = notes.find((note: Notes) => note.id === noteId);

  return (
    <div className="bg-slate-500 w-[1024px] m-auto min-h-[calc(100vh-50px)]">
      {note ? (
        <div className="w-[714px] h-full m-auto pt-4 flex flex-col justify-center items-start">
          <form className="w-full">
            <div className="w-full p-2 border-b-2 border-gray-600 flex flex-row">
              <div className="font-medium text-3xl text-white mr-2">
                หัวข้อ:
              </div>
              <input
                type="text"
                id="title"
                placeholder={note.title}
                className="w-full p-1 rounded-md"
              />
            </div>
            <div className="w-full p-2 text-white border-b-2 border-gray-600 flex flex-row justify-between items-center">
              <p className="text-sm">Created by {note.userName}</p>
              <button className="bg-gray-400 text-white rounded-md p-1">
                แก้ไข
              </button>
            </div>
            <div className="bg-[#d6d6d6] w-full min-h-[calc(100vh-200px)] mt-2 p-4">
              <p className="">{note.note}</p>
            </div>
          </form>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default EditNote;
