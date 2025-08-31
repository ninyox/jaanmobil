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
export default function Filtermodal({ close, sort,value }) {
  const router = useRouter();
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("popularity");
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
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

  const Reset = () => {
    setMax("");
    setMin("");
    setSort("popularity");
  };

  const handleSubmit = () => {
    const load = {
      min: min,
      max: max,
      sorts: sorts,
    };
    sort(load);
    close()
  };

  const settings = () => {
    setSort(value)
  }

  useEffect(() => {
  settings()
  },[])

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
          className="bg-white h-auto w-screen sm:w-4/5 md:w-3/5 flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between dark:bg-gray-900 sm:rounded-[30px]"
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
            <div className="w-full h-auto mb-3">
              <p className="font-interbold text-lg">Sort</p>

              <div className="w-full border-slate-300 rounded-md h-auto">
                <span className="w-full flex items-center justify-between px-2 my-3">
                 <p className="text-sm font-intermedium">Popularity</p>
                 <input onChange={(e) => setSort(e.target.value)}  value="popularity" checked={sorts === "popularity"} type="radio" className=" w-4 h-4" />
                </span>
                <span className="w-full flex items-center justify-between px-2 my-3">
                 <p className="text-sm font-intermedium">Latest</p>
                 <input onChange={(e) => setSort(e.target.value)}  value="new" checked={sorts === "new"} type="radio" className="w-4 h-4" />
                </span>
                <span className="w-full flex items-center justify-between px-2 my-3">
                 <p className="text-sm font-intermedium">Price: Low to High</p>
                 <input onChange={(e) => setSort(e.target.value)} value="low" checked={sorts === "low"} type="radio" className="w-4 h-4" />
                </span>
                <span className="w-full flex items-center justify-between px-2 my-3">
                 <p className="text-sm font-intermedium">Price: High to Low</p>
                 <input onChange={(e) => setSort(e.target.value)}  value="high" checked={sorts === "high"} type="radio" className="w-4 h-4" />
                </span>
              </div>
            </div>
            <span className="w-full bg-slate-100 dark:bg-gray-700 h-1 my-8 flex">
            </span>
            <div className="w-full h-auto mb-3">
              <p className="font-interbold text-lg text-slate-900 dark:text-gray-200">Price</p>

              <div className="w-full h-auto flex justify-around">
                <span className="w-40 h-8 bg-slate-200 flex rounded-md items-center px-1 dark:bg-gray-700">
                  <p className="text-sm font-inter text-slate-400 mx-1">Min</p>
                  <input
                    className="w-full h-6 outline-none rounded-sm dark:bg-gray-900 bg-transparent"
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </span>


                <span className="w-40 h-8 bg-slate-200 flex rounded-md items-center px-1 dark:bg-gray-700">
                  <p className="text-sm font-inter text-slate-400 mx-1">Max</p>
                  <input
                    className="w-full h-6 outline-none rounded-sm dark:bg-gray-900 bg-transparent"
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </span>
              </div>
            </div>
          </section>
          <div className="mt-5 w-full h-auto flex items-center justify-around py-2 mb-3">
            <button
              onClick={() => Reset()}
              className="w-auto px-7 h-8 bg-slate-300 text-sm font-interbold rounded-full py-1"
            >
              Reset
            </button>
            <button
              onClick={() => handleSubmit()}
              className="w-auto px-10 h-8 bg-mycolor text-white font-interbold text-sm rounded-full py-1"
            >
              Show results
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
