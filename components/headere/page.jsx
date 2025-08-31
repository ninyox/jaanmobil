import Image from "next/image";
import { useState } from "react";
import { TiHomeOutline } from "react-icons/ti";
import { CiBookmarkCheck, CiChat2, CiCirclePlus, CiHome } from "react-icons/ci";
import { Humanicon, Penicon } from "../icons/icons";
import { useAuth } from "@/store/authstore";
import { useRouter } from "next/navigation";
import Earnmodal from "@/components/earnmodal/page.js";
import Authmodal from "../authmodal/page";
import useModal from "@/store/modal";
import {
  MdChat,
  MdChatBubble,
  MdChatBubbleOutline,
  MdHome,
} from "react-icons/md";
import { IoWallet, IoWalletOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

export default function Headere() {
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const [earnmodal,setEarnmodal] = useState(false)
  const { authValue } = useAuth();
  // const { headclick,penclick } = props;
  const router = useRouter();
  const handleRoute = (prop) => {
    if (authValue) {
      router.push(prop);
    } else {
      handleOpenModal();
    }
  };

  const handleEarn = (prop) => {
    if(authValue){
      setEarnmodal(true)
    }
    else{
      handleOpenModal()
    }
  };
  return (
    <>
      <div className="w-screen h-auto md:flex flex-col px-4 border-b border-slate-300 bg-white dark:bg-gray-900 hidden">
        <div className="logotop w-full h-auto flex justify-between items-center">
          <img
            src="/logo.png"
            className="w-20 sm:w-1/5 cursor-pointer "
            onClick={() => router.push("/")}
          />
        <div className="inputbox rounded-[30px] sm:flex items-center py-2 h-12 px-2 w-auto hidden justify-around">
<button
    className="flex items-center mx-4"
    onClick={() => handleRoute("/post")}
  >
    <CiCirclePlus size={25} className="" />
    <p className="font-intermedium text-[11px] text-slate-800 dark:text-gray-100 mx-1">
      Post
    </p>
  </button>



  <button
    className="flex items-center mx-4"
    onClick={() => handleEarn("/earn")}
  >
    <IoWalletOutline size={25} className="" />
    <p
      className={`font-intermedium text-[11px] text-slate-800 dark:text-gray-100 mx-1`}
    >
      Earn
    </p>
  </button>

 
  <button
    className="flex items-center relative mx-4"
    onClick={() => handleRoute("/chats")}
  >
    <MdChatBubbleOutline size={23} className="" />
    <p className="font-intermedium text-[11px] text-slate-800 dark:text-gray-100 mx-1">
      Chats
    </p>
  </button>

  <button
    className="flex items-center mx-4"
    onClick={() => handleRoute("/profile")}
  >
    <FiUser size={25} className="" />
    <p className="font-intermedium text-slate-800 text-[11px] dark:text-gray-100 mx-1">
      Profile
    </p>
  </button>
</div>
        </div>
      </div>
      {showModal && <Authmodal close={handleCloseModal} />}
      {earnmodal && <Earnmodal close={() => setEarnmodal(false)} />}
    </>
  );
}
