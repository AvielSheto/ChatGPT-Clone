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
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
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
     
      {session && (
        <div onClick={() => signOut()} className="flex justify-evenly p-3 rounded-md space-x-3 bg-gray-700/50 hover:bg-gray-700">
          <div className="flex-1 my-auto">
            <p className="flex text-white ml-1 ">Logout <ArrowRightOnRectangleIcon className="ml-1 h-7 w-7"/></p>
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
  );
}

export default SideBar;
