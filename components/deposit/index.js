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
import {Log,Location} from "./log.js";
import { useRef, useState } from "react";
import Loader from "@/components/loader/loader";
import { router } from "expo-router";


export default function Deposit({ close,balance,country }) {

  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [load,setLoad] = useState(false)
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

  const handleSubmit = async () => {
    setLoad(true)
    close()
    try {
     const response = await Log(quantity);
     console.log(response[0])
     const result = response[0].id
     router.push(`/viewinvoice/${result}`)
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoad(false)
    }
  };


  return (
    <>
   
        <View
          ref={modalRef}
          onClick={(event) => closeUp(event)}
          className="fixed inset-0 z-[5000] backdrop-blur-sm bg-slate-700 bg-opacity-50 w-screen min-h-screen h-auto flex flex-col justify-end md:justify-center disable overscroll-y-contain items-center"
        >
          <View
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1, y: 200 }}
            transition={{ duration: 0.5 }}
            className="bg-white h-auto w-full flex flex-col items-center pt-4 px-3 pb-10 rounded-t-[20px] relative md:w-40 md:rounded-md"
          >
            <View
            
              ref={refThrough}
              className="w-full h-14 py-1 border-b absolute top-0 left-0  overflow-y-contain"
            >
              <View className="w-full h-auto px-2 flex items-center justify-center">
                <View className="w-16 h-[6px] bg-mycolor rounded-full"></View>
              </View>
              <View className="w-full h-auto px-2 justify-center items-center flex py-1">
                <Text className="font-interbold text-md"> Deposit Money </Text>
              </View>
            </View>

            <View className="w-full h-auto mt-16 overflow-y-auto flex flex-col items-center">
              
              <View className="w-full h-auto mt-3 flex justify-center px-4 flex-col mb-4">
              <Text className="text-md font-intermedium mb-2">Enter amount to deposit</Text>
                <TextInput
                  className="text-center font-interbold text-md bg-slate-200 py-1 px-3 rounded-md w-16"
                  value={quantity}
                  onChange={(value) => setQuantity(value.target.value)}
                />
               
              </View>
           
              <View className="w-full h-auto my-3 px-3">
                <TouchableOpacity
                  className="w-full bg-mycolor h-auto py-2 rounded-md text-md font-intermedium text-white"
                  onClick={() => handleSubmit()}
                >
                  Deposit {currency(country)} {quantity}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
   
      {load && <Loader />}
    </>
  );
}

const filter = (prop,currency) => {
  if(currency === "Nigeria"){
    return prop * 250;
  }
  else {
    return prop * 0.25
  }
};

const currency = (prop) => {
  if(prop === "Nigeria"){
    return "₦"
  }
  else {
    return "£"
  }
}