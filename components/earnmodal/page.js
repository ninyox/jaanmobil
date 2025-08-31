import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import useModal from "@/store/modal";
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { Modal,View,Text,TextInput,Pressable,TouchableOpacity, Image } from "react-native";
export default function Earnmodal({ close, sort, value }) {
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("popularity");
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

  const setting = () => {
    if (value === "trending") {
      setTrend(true);
    } else if (value === "New") {
      setNew(true);
    }
  };

  useEffect(() => {
    setting();
  }, [value]);
  return (
    <>
      <Modal transparent={true}>
        <Pressable
          onPress={(event) => closeUp(event)}
          className="fixed inset-0 backdrop-blur-sm bg-setgray w-screen h-screen flex flex-col justify-center items-center px-3 z-[9999]"
        >
          <View
            className="bg-white h-1/2 w-full flex flex-col items-center pt-2 px-3 rounded-md relative lol:bg-gray-900 md:w-1/2"
          >
            <Text className="text-md font-interbold my-5 lol:text-gray-200">
              How do you want to earn today?
            </Text>
            <TouchableOpacity
              className="w-8 h-8 rounded-full bg-red-500 absolute -right-2 -top-3 flex items-center justify-center"
              onPress={() => close()}
            >
              <Text className="text-white font-interbold">X</Text>
            </TouchableOpacity>

            <View className="w-full flex-grow pb-5 flex flex-wrap justify-around flex-row">
              <View className="w-5/12 h-auto flex-grow-0 my-3 flex flex-col border p-2 rounded-md justify-between">
                <View className="w-full h-1/3 flex-row flex">
                  <Image
                    source="https://korakota.com/social.png"
                    className="w-full h-full object-cover"
                  />
                </View>

                <View className="">
                  <Text className="font-interbold text-[10px] text-center">
                    Perform social tasks and earn daily
                  </Text>
                  <Text className="font-inter text-[10px] text-center">
                    You earn by simply posting listings on your various social
                    pages.
                  </Text>
                </View>

                <TouchableOpacity
                  className=" px-3 py-1 rounded-sm text-sm font-intermedium my-2 bg-mycolor text-white "
                  onClick={() => router.push("/earn/social")}
                >
                  <Text>Start</Text>
                </TouchableOpacity>
              </View>

              <View className="w-5/12 h-auto my-3 flex flex-col border p-2 rounded-md justify-between">
                <View className="w-full h-4/12 flex flex-row">
                  <Image source={{uri:"http://korakota.com/undrawmoney.png"}} className="bg-white w-full h-full" />
                </View>

                <View className="">
                  <Text className="font-interbold text-[10px] text-center">
                    Resell people's products{" "}
                  </Text>
                  <Text className="font-inter text-[10px] text-center">
                    You earn by reaching out to posters for partnerships to get
                    commisions off sale.
                  </Text>
                </View>

                <TouchableOpacity className="px-3 py-1 rounded-sm text-sm font-intermedium my-2 bg-mycolor text-white">
                <Text>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
