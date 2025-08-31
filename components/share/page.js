import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { router } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  gestureHandlerRootHOC
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";
import Qrbox from "../qrbox/page.js";
import { MdArrowBack, MdOutlineQrCode } from "react-icons/md";
import { useRouter } from "next/navigation";
import {EmailIcon,EmailShareButton,TwitterShareButton,TwitterIcon,TelegramShareButton,TelegramIcon,FacebookIcon,FacebookMessengerIcon,WhatsappIcon,WhatsappShareButton, FacebookShareButton, XIcon, LinkedinShareButton, LinkedinIcon,} from "react-share"
import {
  salesarray,
  hospitalarray,
  employarray,
  servicesarray,
} from "./array.js";
import { IoMdCopy } from "react-icons/io";

export default function Sharemodal({ close, param, title,image }) {
  const router = useRouter();
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("popularity");
  const [trend, setTrend] = useState(false);
  const [qrmodal, setQrmodal] = useState(false);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();

  const shareurl = `https://korakota.com/ads/${param}`
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


  const Reset = () => {
    //   setMax("");
    // setMin("");
    setSort("popularity");
  };

function copy () {
  navigator.clipboard.writeText(shareurl)
  alert("Copied")
}
  return (
    <>
      <div
        ref={modalRef}
        onClick={(event) => closeUp(event)}
        className="fixed h-auto inset-0 backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen min-h-scree flex flex-col justify-end sm:justify-center sm:items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 200 }}
          transition={{ duration: 0.5 }}
          className="dark:bg-slate-900 bg-white h-auto w-screen flex flex-col items-center pt-2 px-2 rounded-t-[20px] justify-between sm:w-2/5 sm:rounded-[20px] sm:border-2 sm:border-mycolor pb-2 sm:pb-0"
        >
          <div
            {...handlers}
            ref={refThrough}
            className="w-full h-6 py-1"
          >
            <span className="w-full h-auto px-2 flex items-center justify-center">
              <span className="w-16 h-[6px] bg-mycolor rounded-full"></span>
            </span>
          </div>

          <section className="w-full h-auto pb-5">
            <div className="w-full h-auto flex border-b border-slate-400 py-2">
              <img src={image} alt="Image of the Advert" className="w-12 rounded-md mr-2 h-12" />
              <span className="">
              <p className="dark:text-white text-black font-intermedium">{shareurl}</p>
              <p className="dark:text-white text-black font-inter text-sm">{title}</p>
              </span>
        
            </div>


            <div className="w-full h-auto my-3 flex justify-between border-b border-slate-400 py-2">
             <span className="flex flex-col items-center">
              <WhatsappShareButton url={shareurl} >
                <WhatsappIcon size={45} className="rounded-md" />
              </WhatsappShareButton>
              <p className="dark:text-white text-black text-[10px] font-inter my-1">WhatsApp</p>
             </span>

             <span className="flex flex-col items-center">
              <FacebookShareButton url={shareurl} >
                <FacebookIcon size={45} className="rounded-md" />
              </FacebookShareButton>
              <p className="dark:text-white text-black text-[10px] font-inter my-1">Facebook</p>
             </span>

             <span className="flex flex-col items-center">
              <EmailShareButton url={shareurl} >
                <EmailIcon size={45} className="rounded-md" />
              </EmailShareButton>
              <p className="dark:text-white text-black text-[10px] font-inter my-1">Gmail</p>
             </span>

             <span className="flex flex-col items-center">
              <TwitterShareButton url={shareurl} >
                <XIcon size={45} className="rounded-md" />
              </TwitterShareButton>
              <p className="dark:text-white text-black text-[10px] font-inter my-1">X</p>
             </span>

             <span className="flex flex-col items-center">
              <LinkedinShareButton url={shareurl} >
                <LinkedinIcon size={45} className="rounded-md" />
              </LinkedinShareButton>
              <p className="dark:text-white text-black text-[10px] font-inter my-1">LinkedIn</p>
             </span>


            </div>

            <div className="w-full h-auto ">
            <span onClick={() => setQrmodal(true)} className="w-full h-auto border-2 rounded-full flex items-center justify-center mb-2 cursor-pointer ">
               <MdOutlineQrCode size={35} className="m-3 " />
              </span>
              <span onClick={() => copy()} className="w-auto h-auto border-2 rounded-full flex items-center justify-center cursor-pointer ">
               <IoMdCopy size={35} className="m-3 " />
              </span>
            </div>
          </section>
        </motion.div>
      </div>
      {qrmodal && <Qrbox image={shareurl} cancel={() => setQrmodal(false)} />}
    </>
  );
}
