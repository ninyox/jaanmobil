"use client";
import { CgProfile } from "react-icons/cg";
import { CiBookmarkCheck, CiChat2, CiCirclePlus, CiHome } from "react-icons/ci";
import Authmodal from "@/components/authmodal/page";
import { useAuth } from "@/store/authstore";
import {
  MdChat,
  MdChatBubble,
  MdChatBubbleOutline,
  MdHome,
} from "react-icons/md";
import useModal from "@/store/modal";
import { TiHomeOutline } from "react-icons/ti";
import { useRouter } from "next/navigation";
import { IoWalletOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";
import Header from "../sidehead/page";

export default function SideBar({ selected }) {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const { authValue } = useAuth();
  const router = useRouter();
  const handleRoute = (prop) => {
    if (authValue) {
      router.push(prop);
    } else {
      handleOpenModal();
    }
  };




  return (
    <>
      <div className="sm:w-1/5 h-auto sm:flex flex-col items-center px-3 border-slate-200 py-2 bg-white hidden border-r-2">
        <Header />

        <button
          className={`${
            selected === "home" ? "bg-mycolor" : "bg-none"
          } flex items-center w-full h-auto py-1 justify-center rounded-md my-1 border`}
          onClick={() => handleRoute("/")}
        >
          {selected === "home" ? (
            <>
              <p
                className={`${
                  selected === "home" ? "text-white" : "text-slate-800"
                } font-interbold text-sm`}
              >
                Home
              </p>
            </>
          ) : (
            <>
              <p className={`font-interbold text-sm text-slate-900`}>Home</p>
            </>
          )}
        </button>

        <button
          className={`${
            selected === "earn" ? "bg-mycolor" : "bg-none"
          } flex items-center w-full h-auto py-1 justify-center rounded-md my-1 border `}
        >
          {selected === "earn" ? (
            <>
              <p className={`font-interbold text-md text-mycolor`}>Earn</p>
            </>
          ) : (
            <>
              <p className={`font-interbold text-sm text-slate-800`}>Earn</p>
            </>
          )}
        </button>

        <button
          className={`${
            selected === "post" ? "bg-mycolor" : "bg-none"
          } flex items-center w-full h-auto py-1 justify-center rounded-md my-1 border`}
          onClick={() => handleRoute("/post")}
        >
          {selected === "earn" ? (
            <p className="font-interbold text-sm text-slate-800">Post ad</p>
          ) : (
            <p className="font-interbold text-sm text-slate-800">Post ad</p>
          )}

        </button>

        <button
          className={`${
            selected === "chats" ? "bg-mycolor" : "bg-none"
          } flex items-center w-full h-auto py-1 justify-center rounded-md my-1 border`}
          onClick={() => handleRoute("/chats")}
        >
          {selected === "chats" ? (
            <>
              <p className="font-interbold text-sm text-white">Chats</p>
            </>
          ) : (
            <>
              <p className="font-interbold text-sm text-slate-800">Chats</p>
              <span className="absolute -top-[6px] -right-[2px] bg-red-500 w-4 h-4 rounded-[20px] bg-opacity-45 animate-ping inline-flex"></span>
            </>
          )}
        </button>

        <button
          className={`${
            selected === "profile" ? "bg-mycolor" : "bg-none"
          } flex items-center w-full h-auto py-1 justify-center rounded-md my-1 border`}
          onClick={() => handleRoute("/profile")}
        >
          {selected === "profile" ? (
            <>
              <p className="font-interbold text-white text-sm">Profile</p>
            </>
          ) : (
            <>
              <p className="font-interbold text-slate-800 text-sm">Profile</p>
            </>
          )}
        </button>

        <button
          className={`bg-red-500 flex items-center w-full h-auto py-1 justify-center rounded-md my-1 border`}
          onClick={() => handleRoute("/profile")}
        >
          {selected === "profile" ? (
            <>
              <p className="font-intermedium text-white text-sm">Log out</p>
            </>
          ) : (
            <>
              <p className="font-interbold text-white text-sm">Log out</p>
            </>
          )}
        </button>
      </div>
      {showModal && <Authmodal close={handleCloseModal} />}
    </>
  );
}
