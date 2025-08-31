"use client";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  salesarray,
  hospitalarray,
  employarray,
  servicesarray,
} from "./array.js";
export default function Filtermodale({ sort, value }) {
  const router = useRouter();
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("popularity");
  const [trend, setTrend] = useState(false);
  const [news, setNew] = useState(false);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();


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

  const setting = () => {
    if (value === "trending") {
      setTrend(true);
    }
    else if (value === "New"){
      setNew(true)
    }
  };

  const Reset = () => {
    //   setMax("");
    // setMin("");
    setSort("popularity");
  };

  const handleSubmit = (type) => {
    sort(type);
  };

  useEffect(() => {
     setting()
  }, [value]);
  return (
    <>

        <motion.div
          className="bg-white rounded-md h-auto w-screen md:w-auto fle hidden flex-col items-center pt-2 px-3 justify-between sm:w-2/5 pb-6 sm:pb-0 dark:bg-gray-900 dark:border-gray-500"
        >
          <div
            
            className="w-full h-auto py-1 border-b-[0.5px] dark:border-gray-500"
          >
            
            <div className="w-full h-auto px-2 flex py-1">
              <p className="font-interbold text-md">Filter</p>
            </div>
          </div>

          <section className="w-full h-auto pb-5">
            <div className="w-full h-auto my-3 flex">
            <input
                type="radio"
                checked={value === "Trending"}
                value={trend}
                onChange={() => handleSubmit("Trending")}
                className=""
              />
              <p className="r mx-3">Trending</p>             
            </div>
            <div className="w-full h-auto my-3 flex">
            <input
                type="radio"
                value={news}
                checked={value === "Latest"}
                onChange={() => handleSubmit("Latest")}
                className=""
              />
              <p className=" mx-3">Latest</p>
             
            </div>
          </section>
        </motion.div>
    </>
  );
}
