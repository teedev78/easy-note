"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type User = {
  email: string;
  name: string;
};

const CreateNote = () => {
  const router = useRouter();
  const [session, setSession] = useState<User | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [noteContent, setNoteContent] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [newCategoryInput, setNewCategoryInput] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [categoryOption, setCategoryOption] = useState<string>("");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setSession(null);
  };

  const fetchCategory = () => {
    const token = JSON.parse(localStorage.getItem("token")!);

    axios
      .get(`${process.env.NEXT_PUBLIC_NOTE_EASY_API}/category`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data.category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")!);
    const user = JSON.parse(localStorage.getItem("user")!);
    setToken(token);
    setSession(user);
    fetchCategory();
  }, []);

  useEffect(() => {}, []);

  const handlerNoteTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNoteTitle(e.target.value);
  };

  const handlerNoteContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteContent(e.target.value);
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.NEXT_PUBLIC_NOTE_EASY_API}/note/create`,
        {
          title: noteTitle,
          content: noteContent,
          author: session?.name,
          category: categoryOption,
          tag: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = e.target.value;
    if (value === "new") {
      setNewCategoryInput(true);
    } else {
      setCategoryOption(value);
      setNewCategoryInput(false);
    }
  };

  const saveNewCategory = async () => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_NOTE_EASY_API}/category`,
        {
          category: categoryInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setCategories(res.data.categories);
        setNewCategoryInput(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
      <main className="bg-slate-500 w-[1024px] h-[calc(100vh-50px)] m-auto p-4">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-[714px] h-full m-auto pt-4 flex flex-col justify-center items-start">
            <h1 className="text-white text-3xl font-medium text-center w-full mb-5">
              Create Note
            </h1>
            <form onSubmit={handleSave} className="w-full">
              <div className="w-full py-2 border-b-2 border-gray-600 flex flex-row">
                <div className="font-medium text-3xl text-white mr-2">
                  Title:
                </div>
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={noteTitle}
                  onChange={handlerNoteTitle}
                  className="w-full p-1 rounded-md"
                />
              </div>
              <div>
                <select onChange={handleCategory} className="w-[250px] mt-1">
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value={"new"}>+ Add new category</option>
                </select>
                {newCategoryInput && (
                  <div className="mt-1">
                    <input
                      type="text"
                      name="new-category"
                      placeholder="category name"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      className="p-1 w-[250px] rounded-sm"
                    />
                    <button
                      type="button"
                      onClick={() => saveNewCategory()}
                      className="border-2 border-green-600 bg-green-500 px-1 mx-1 rounded-sm"
                    >
                      Select
                    </button>
                    <button
                      onClick={() => setNewCategoryInput(false)}
                      className="border-2 border-red-600 bg-red-500 px-1 rounded-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-[#d6d6d6] w-full h-[550px] mt-2 p-4 flex items-center">
                <textarea
                  id="content"
                  placeholder="Note..."
                  onChange={handlerNoteContent}
                  className="w-full h-[500px] p-2 rounded-sm"
                />
              </div>
              <div className="text-right w-full py-2">
                <button
                  type="submit"
                  className="w-[70px] border-2 border-green-600 rounded-md bg-green-400 p-1 text-black font-medium"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default CreateNote;
