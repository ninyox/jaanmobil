"use client";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import useModal from "@/store/modal";
import { useRef, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import {
  salesarray,
  hospitalarray,
  employarray,
  servicesarray,
} from "./array.js";
export default function Filtermodale({ close, sort,value }) {
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
  };

  return (
    <>
    
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 200 }}
          transition={{ duration: 0.5 }}
          className="border bg-white h-auto w-full hidden md:flex flex-col items-center pt-2 mt-2 rounded-md px-1 justify-between dark:bg-gray-900"
        >
          <div
            className="w-full h-auto py-1 border-b"
          >
            <div className="w-full h-auto px-2 justify-cente items-center flex">
              <p className="font-interbold text-md">Filters</p>
            </div>
          </div>

          <section className="w-full h-auto pb-5 mt-2">
            <div className="w-full h-auto mb-3">
              <p className="font-inte">Sort</p>
              <div className="w-full border border-slate-300 rounded-md h-10">
                <select
                  className="bg-transparent w-full h-full text-sm"
                  value={sorts || value}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="new">Latest </option>
                  <option value="low">Lowest Pricing</option>
                  <option value="high">Highest Pricing</option>
                </select>
              </div>
            </div>

            <div className="w-full h-auto mb-3">
              <p className="font-inte">Price</p>
              <div className="w-full h-auto flex justify-around">
                <span className="w-40 h-auto">
                  <p className="text-sm">Min</p>
                  <input
                    className="w-full h-8 border border-slate-700 rounded-sm dark:bg-gray-900"
                    type="number"
                    value={min}
                    onChange={(e) => setMin(e.target.value)}
                  />
                </span>
                <span className="w-40 h-auto">
                  <p className="text-sm">Max</p>
                  <input
                    className="w-full h-8 border border-slate-700 rounded-sm dark:bg-gray-900"
                    type="number"
                    value={max}
                    onChange={(e) => setMax(e.target.value)}
                  />
                </span>
              </div>
            </div>
          </section>
          <div className="my-5 w-full h-auto flex items-center justify-around ">
            <button
              onClick={() => Reset()}
              className="w-40 h-8 border-mycolor border font-intermedium rounded-full text-md"
            >
              Reset
            </button>
            <button
              onClick={() => handleSubmit()}
              className="w-40 h-8 bg-mycolor text-white font-intermedium rounded-md"
            >
              Show
            </button>
          </div>
        </motion.div>
    </>
  );
}
