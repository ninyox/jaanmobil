import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";

export default function Reportoption({ close, firstid, secondid }) {

  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("Trending");
  const [trend, setTrend] = useState(false);
  const [value, setValue] = useState(false);
  const [news, setNew] = useState(false);
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      console.log("logged")
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

 

 

  const handleSubmit = (type) => {
    
    close();
  };

  return (
    <>
      <TouchableOpacity
        ref={modalRef}
        onPress={closeUp}
        className="fixed inset-0 backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen h-screen flex flex-col justify-end sm:justify-center sm:items-center"
      >
        <View
        
          className="bg-white h-auto w-screen flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between sm:w-2/5 sm:rounded-[20px] sm:border-2 sm:border-mycolor pb-6 sm:pb-0 dark:bg-gray-900 dark:border-gray-500"
        >
          <View
            ref={refThrough}
            className="w-full h-14 py-1 border-b-[0.5px] dark:border-gray-500"
          >
            <View className="w-full h-auto px-2 flex items-center justify-center">
              <View className="w-16 h-[6px] bg-mycolor rounded-full"></View>
            </View>
         
          </View>

          <View className="w-full h-auto pb-5 px-2">
            <TouchableOpacity className="w-full h-auto my-3 flex justify-center items-center border rounded-lg py-2 ">
              <Text className="font-interbold">Dispute</Text>
            
            </TouchableOpacity>
            <TouchableOpacity className="w-full h-auto my-3 flex justify-center items-center border rounded-md py-2">
              
              <Text className="font-interbold">Pay</Text>
             
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
