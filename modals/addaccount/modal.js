"use client";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";
import { MdArrowBack, MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { FaCopy } from "react-icons/fa";
import {Log} from "./log.js"
import { FaDownload } from "react-icons/fa6";
export default function Addmodal({ close, sort, value }) {
  const router = useRouter();
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("popularity");
  const [trend, setTrend] = useState(false);
  const [profile, setProfile] = useState("");
  const [postlink,setPostlink] = useState("")
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };

  const handleSwipeStart = (event) => {
    // event.preventDefault()
    if (event.touches && event.touches.length > 0) {
      setstartY(event.touches[0].clientY);
    }
  };
  const handleSwipeEnd = (event) => {
    //   event.preventDefault()
    if (event.touches && event.touches.length > 0) {
      const deltaY = event.changedTouches[0].clientY - startY;

      const swipethreshold = 100;

      if (deltaY >= swipethreshold) {
        close();
      } else {
        alert(deltaY);
      }
    }
  };

  const handlers = useSwipeable({
    onSwipedDown: () => close(),
    onSwipedUp: (e) => handleSwipeEnd(e),
    onSwiping: (e) => handleSwipeStart(e),
    onSwipedLeft: () => alert("swiped left"),
    preventScrollOnSwipe: true,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const refThrough = (el) => {
    handlers.ref(el);

    headerRef.current = el;
  };

  const handleSubmit = async() => {
    if(profile === "" || postlink === ""){
      console.log("frro")
      return alert("A required input is empty")
    }
    try{
     const response = await Log(profile,postlink)
     if(response.success){
      alert(response.message)
      return
     }
     else {
      alert(response.message || "Currently unable to Save your account")
     }

    }
    catch(error){
      alert("Currently unable to Save your account")
    }
  }

 const text = "lorem ipsum lorem ipsum ljdddmdvdbcvjsdvwhjdbewjdbvewjbdvwhgdv w3bdjvwdjv db,wc vhjgc vlorem ipsum lorem ipsum ljdddmdvdbcvjsdvwhjdbewjdbvewjbdvwhgdv w3bdjvwdjv db,wc vhjgc v,"
  return (
    <>
      <div
        ref={modalRef}
        onClick={(event) => closeUp(event)}
        className="fixed inset-0 backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen h-screen flex flex-col justify-center items-center px-3 z-[9999]"
      >
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 200 }}
          transition={{ duration: 0.5 }}
          className="bg-white h-[90%] w-full flex flex-col items-center pt-2 p-2 rounded-md relative dark:bg-gray-900 md:w-1/2 "
        >
       <section className="h-full w-full overflow-x-auto flex flex-col items-center">
       <p className="text-md font-interbold mb-5 dark:text-gray-200">Link your {value} account</p>
         <button className="w-8 h-8 rounded-full bg-red-500 absolute -right-2 -top-3 flex items-center justify-center z-999" onClick={() => close()}>
            <p className="text-white font-interbold" >X</p>
         </button>
          <section className="w-full h-auto pb-5 flex flex-wrap justify-around">
        <div className="bg-green-100 rounded-md text-center w- full p-2">
            <p className="text-[12px] text-green-600 font-intermedium">You must meet the following guidelines to link your {value} account to Korakota</p>
        </div>

        <div className="my-3 px-1 font-intermedium">
            <p className="text-[11px]">1. Your {value} account must have at least <b>500 active followers</b></p>

            <p className="text-[11px] my-2">2. Your {value} Account must have been opened at least 6 months ago</p>

            <p className="text-[11px]">3. You must have posted at least 5 times on your {value} account withing the last 6 months </p>
        </div>

<div className="bg-green-100 text-green-600 p-2">
    <p className="text-[12px] mb-2">1. In order to link your {value} account to Korakota, You have to upload a new post on your {value} Account using the advert text and the advert media shown below. </p>

    <p className="text-[12px] ">2. After you have created the new post, you will then come back to Korakota and fill the form below entering your {value} profile link and the link to the {value} post you just created. </p>
</div>

          </section>

          <section className="w-full h-auto pb-5 flex flex-col justify-around border-t-[0.5px]">


           <div className="w-full h-auto border-2 rounded-md p-2 my-1">
            <span className="flex items-center justify-between">
            <p className="text-sm font-intermedium my-1">Advert Media</p>
            <button className="text-[12px] my-1 px-3 rounded-md bg-mycolor py-1 uppercase flex text-white items-center"><FaDownload className="fill-white mx-1" /> Download</button>
            </span>
          
           <p className="text-[10px] bg-green-100 p-1 rounded-[10px] te text-green-600">Download the Advert Media using the 'Download' button above and then upload to Tiktok along with the advert text shown below</p>
        
           <span className="w-full h-auto flex justify-between items-center">
            <p className="text-sm font-intermedium">Advert Text</p>
            <button className="text-[12px] my-1 px-3 rounded-md bg-mycolor py-1 uppercase flex text-white items-center"><FaCopy size={10} className="mx-[2px]" /> Copy Text</button>
           </span>
           </div>



           <div className="w-full h-auto block border-2 rounded-md p-2">
            <p className="text-[12px] font-interbold">Submit your {value} Profile Link and the link to the New Tiktok Post you just created:</p>
            <input className="dark:bg-gray-900 px-1 border rounded-md text-sm w-full h-8 my-2" placeholder ={` ${value} Profile Link`} value={profile} onChange={(e) => setProfile(e.target.value)} />
            <input className="dark:bg-gray-900 px-1 border rounded-md text-sm w-full h-8 my-2" placeholder ={` ${value} Post Link`} value={postlink} onChange={(e) => setPostlink(e.target.value)} />

            <button onClick={() => handleSubmit()} className="rounded-md bg-mycolor text-white px-2 py-[7px] text-sm w-full">Link Account</button>
            </div>
          </section>

       </section>
      

        </motion.div>
      </div>
    </>
  );
}
