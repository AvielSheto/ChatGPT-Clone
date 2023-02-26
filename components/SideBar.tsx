"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <>
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 "
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6 "
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full flex flex-col justify-between px-3 py-4 overflow-y-auto bg-[#202123]">
          <div>
            <a
              href="https://flowbite.com/"
              className="flex items-center pl-2.5 mb-5"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
                className="h-6 mr-3 sm:h-7"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                ChatGPT
              </span>
            </a>

            <div>
              <NewChat />
            </div>

            <div className="hidden sm:inline">
              <ModelSelection />
            </div>

            <div className="flex flex-col space-y-2 my-2 text-white">
              {loading && (
                <div className="animate-pulse text-center text-white">
                  <p>Loading Chats...</p>
                </div>
              )}

              {chats?.docs.map((chat) => (
                <ChatRow key={chat.id} id={chat.id} />
              ))}
            </div>
          </div>

          <div>
            {session && (
              <div
                onClick={() => signOut()}
                className="flex justify-evenly p-3 rounded-md space-x-3 bg-gray-700/50 hover:bg-gray-700"
              >
                <div className="flex-1 my-auto">
                  <p className="flex text-white ml-1 ">
                    Logout{" "}
                    <ArrowRightOnRectangleIcon className="ml-1 h-7 w-7" />
                  </p>
                </div>
                <img
                  src={session.user?.image!}
                  alt="Profile image"
                  className="h-12 w-12 rounded-full cursor-pointer my-auto
              hover:opacity-50"
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;
