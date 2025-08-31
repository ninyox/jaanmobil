"use client";

import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";

import { router } from "expo-router";

export default function Filtermodal({ close, sort, value }) {

  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("Trending");
  const [trend, setTrend] = useState(false);
  const [news, setNew] = useState(false);
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

  
  const refThrough = (el) => {
    handlers.ref(el);

    headerRef.current = el;
  };

 

  const Reset = () => {
    //   setMax("");
    // setMin("");
    setSort("popularity");
  };

  const handleSubmit = (type) => {
    sort(type);
    close();
  };

  return (
    <>
      <View
        ref={modalRef}
        onClick={(event) => closeUp(event)}
        className="fixed inset-0 backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen h-screen flex flex-col justify-end sm:justify-center sm:items-center"
      >
        <View
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 200 }}
          transition={{ duration: 0.5 }}
          className="bg-white h-auto w-screen flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between sm:w-2/5 sm:rounded-[20px] sm:border-2 sm:border-mycolor pb-6 sm:pb-0 dark:bg-gray-900 dark:border-gray-500"
        >
          <View
            {...handlers}
            ref={refThrough}
            className="w-full h-14 py-1 border-b-[0.5px] dark:border-gray-500"
          >
            <View className="w-full h-auto px-2 flex items-center justify-center">
              <View className="w-16 h-[6px] bg-mycolor rounded-full"></View>
            </View>
            <View className="w-full h-auto px-2 justify-center items-center flex py-1">
              <p className="font-interbold text-md">Filter listings</p>
            </View>
          </View>

          <section className="w-full h-auto pb-5">
            <View className="w-full h-auto my-3 flex justify-between">
              <p className="font-interbold">Trending</p>
              <input
                type="radio"
                checked={value === "Trending"}
                value={trend}
                onChange={() => handleSubmit("Trending")}
                className="w-4 h-4"
              />
            </View>
            <View className="w-full h-auto my-3 flex justify-between">
              <p className="font-interbold">Latest</p>
              <input
                type="radio"
                value={news}
                checked={value === "Latest"}
                onChange={() => handleSubmit("Latest")}
                className="w-4 h-4"
              />
            </View>
          </section>
        </View>
      </View>
    </>
  );
}
