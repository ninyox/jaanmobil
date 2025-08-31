"use client";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import useModal from "@/store/modal";
import useToast from "@/store/toast";
import {Log} from "./log.js";
import { Toast } from "@/components/toast/toast";
import Loader from "@/components/loader/loader";
export default function Boostmodal({ close, sort,product }) {
  const { openToast, closeToast, toastmessage, showToast } = new useToast();
  const router = useRouter();
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("popularity");
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [kokocoin,setKokocoin] = useState()
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const [error, setError] = useState(false);



  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };
  const handleRedirect = (text) => {
    router.push(`/advert?category=${text}`);
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

  const Set = () => {
    if(!min){
      setKokocoin('')
      return
    }
    setKokocoin(Number(min) * 2)
  };

  const handleSubmit = async() => {
   if(!min){
    alert("You need to indicate the number of days for the promotion boost");
    return
   }
   if(!product){
    alert("Try Again Later")
   }
   handleOpenModal()
   try{
    const response = await Log(product,min)
    if(response.success){
        setError(true)
        openToast(response.message)
    }
    else{
      setError(false)
        openToast(response.message)
    }
   }
   catch(error){
    console.log(error)
    setError(false)
    openToast("We encountered a problem while boosting your ad. Please try again later.")
   }
   finally{
    handleCloseModal()
   }
  
   
  };


  useEffect(() => {
  Set()
  },[min])

  return (
    <>
      <div
        ref={modalRef}
        onClick={(event) => closeUp(event)}
        className="fixed inset-0 backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen h-screen flex flex-col justify-end sm:justify-center items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 200 }}
          transition={{ duration: 0.5 }}
          className="bg-white h-auto w-screen sm:w-4/5 md:w-3/5 lg:w-2/5 flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between dark:bg-gray-900 sm:rounded-[10px] md:border"
        >
          <div
            {...handlers}
            ref={refThrough}
            className="w-full h-8 py-1"
          >
            <span className="w-full h-auto px-2 flex items-center justify-center">
              <span className="w-16 h-[6px] bg-mycolor rounded-full"></span>
            </span>
          </div>

          <section className="w-full h-auto pb-10">

            <div id="duration" className="w-full h-auto mb-3">
              <p className="font-intermedium text-lg">Set advert duration:</p>
              <div className="w-full border-slate-300 rounded-md h-auto flex items-center mt-2">
                  <input
                    className="w-12 h-6 rounded-sm dark:bg-gray-900 bg-slate-200 border"
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                  <p className="text-sm font-inter mx-1">Days</p>

              </div>
            </div>

            <div id="info" className="">
              <span className="">
               <p className=""></p>
              </span>
            </div>
            <span className="w-full bg-slate-100 dark:bg-gray-700 h-1 my-8 flex">
            </span>




            <div className="w-full h-auto mb-3">
              <p className="font-interbold text-lg text-slate-900 dark:text-gray-200">Price</p>

              <div className="w-full h-auto flex">
                <span className="w-40 h-8 bg-slate-200 flex rounded-md items-center px-1 dark:bg-gray-700">
                <input
                    className="w-full h-6 outline-none rounded-sm dark:bg-gray-900 bg-transparent"
                    type="number"
                    disabled
                    value={kokocoin}
                    onChange={(e) => setMin(e.target.value)}
                  />
                  <p className="text-sm font-inter mx-1">Kokocoin</p>
                 
                </span>
              </div>
            </div>
          </section>
          <div className="mt-5 w-full h-auto flex items-center justify-around py-2 mb-3">
          
            <button
              onClick={() => handleSubmit()}
              className="w-10/12 px-10 h-auto bg-mycolor text-white font-interbold text-sm rounded-lg py-2"
            >
              Boost Advert
            </button>
          </div>
        </motion.div>
      </div>
      {showToast && (
        <Toast
          boolean={error}
          text={toastmessage}
          onClose={() => closeToast()}
        />
      )}
       {showModal && <Loader />}
    </>
  );
}
