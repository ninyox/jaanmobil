"use client";
import { useState, useEffect, Suspense } from "react";
import Footer from "@/components/footer/page";
import { timeAgo } from "@/components/worker/page.js";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import useModal from "@/store/modal";
import { MdArrowBackIos, MdOutlineClose } from "react-icons/md";
import Headere from "@/components/headere/page.jsx";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/loader/loader";
import { Location, Log, Profile } from "./log.js";
import { io } from "socket.io-client";
import SupportScreen from "../supportscreen/screen.jsx"
import { MdCancel } from "react-icons/md";
const userd =
  typeof window !== "undefined"
    ? window.localStorage.getItem("userid")
    : false;
const SERVER_URL = "https://api.korakota.com";
const socket = io(SERVER_URL);

export default function Supportchat({close}) {
  const { showModal, handleOpenModal, handleCloseModal } = new useModal();
  const router = useRouter();
  const searchparam = useSearchParams();
  const [msgArray, setMsgArray] = useState([]);
  const [myimage, setMyimage] = useState("/manphone.jpeg");
  const [myname, setname] = useState("Korakota");
  const [forum, setforum] = useState("");
  const [country,setCountry] = useState('')
  const [title,setTitle] = useState('')
  const [posterid,setPoster] = useState('')
  const [realsender,setSender] = useState('')
  const forumlist = [
    {
      id: 1,
      forumid: "lifestyle",
      message: "Where is your location",
      type:'message',
      sender: "2",
      sendername:"Tundelola",
      senderimage:"/backpack.png",
      receiver: "1",
      time: "2:30 am",
      imageurl: "/backpack.png",
    },
    {
      id: 2,
      forumid: "business",
      message: "Where is your location",
      type:'image',
      sender: "2",
      sendername:"Tundelola",
      senderimage:"/backpack.png",
      receiver: "1",
      time: "2:30 am",
      imageurl: "/backpack.png",
    },
    {
      id: 3,
      forumid: "lifestyle",
      message: "Where is your location",
      type:'image',
      sender: "2",
      sendername:"Tundelola",
      senderimage:"/backpack.png",
      receiver: "1",
      time: "2:30 am",
      imageurl: "/backpack.png",
    },
    {
      id: 1,
      forumid: "lifestyle",
      message: "Where is your location",
      type:'image',
      sender: "1",
      sendername:"Tundelola",
      senderimage:"/backpack.png",
      receiver: "1",
      time: "2:30 am",
      imageurl: "/backpack.png",
    },
    {
      id: 1,
      forumid: "lifestyle",
      message: "Hello group",
      type:'message',
      sender: "2",
      sendername:"Tundelola",
      senderimage:"/backpack.png",
      receiver: "1",
      time: "2:30 am",
      imageurl: "/backpack.png",
    },
  ];
  const FetchData = async (id) => {
    handleOpenModal();
    try {
      const response = await Log(id)
      if(Array.isArray(response)){
        setSender(response[0].sender)
        setMsgArray(response)
      }
      else{
       // router.back()
      }
    } catch (error) {
      router.back()
    } 
    try {
      const response = await Profile()
      setname(`${response.firstname} ${response.lastname}`)
      setMyimage(response.imageurl || "/backpack.png")
    } catch (error) {
     router.back()
    }
    try {
      const response = await Location()
      setCountry(response.country)
    } catch (error) {
      router.back()
    }
    finally {
      handleCloseModal();
    }
  };
  const Send = async() =>{
  try{

  }
  catch(error){

  }
  }

  useEffect(() => {
    FetchData();
  }, []);

  const deletemsg = (ide) => {
    const newArray = msgArray.filter((item) => item.id !== ide);
    setMsgArray(newArray);
  };
  const handleSubmit = async (data) => {
    const currentDate = new Date();
    const hydon = {
      forumid:forum,
      country:country,
      message: data.text,
      type: data.type,
      sender: userd,
      sendername:myname,
      senderimage:myimage,
      imageurl:data.imageurl,
      time: currentDate.toISOString()
    };
    await Send(hydon);
    setMsgArray((prevmessage) => [...prevmessage, hydon]);
    return;
    
  };
  return (
    <>
    <main className="w-screen h-screen min-h-full flex flex-col items-center fixed top-0 bottom-0 justify-center">
     
      <main className="w-screen h-screen flex dark:bg-gray-900 md:w-2/3 lg:w-1/3 md:h-4/5">
      <main className="w-full min-h-full h-auto flex flex-col dark:bg-gray-900 md:border-2 relative">
        <header className="w-full h-auto px-2 py-2 flex flex-col items-center justify-between border-b-[0.5px] dark:border-gray-500 bg-blue-400 dark:bg-gray-900 ">
          <span className="w-full h-auto justify-end flex" >
            <MdOutlineClose size={20} className="fill-white" onClick={() => close()}/>
          </span>
          <span className="my-4">
            <p className="font-interbold text-center text-lg text-white">Hello {myname}</p>
            
          </span>
          <span className="w-full flex px-4 h-auto">
            <p className="text-white text-sm font-inter text-center">We are an experienced team that provides fast and accurate solutions to your concerns.</p> 
          </span>
        </header>
        <SupportScreen
          submit={(data) => handleSubmit(data)}
          receivedData={msgArray}
          country={country}
          optiondelete={(e) => deletemsg(e)}
        />
      </main>
      </main>
      {showModal && <Loader />}
    </main>
    </>
  );
}


