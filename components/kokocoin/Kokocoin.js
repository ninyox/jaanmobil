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
import useModal from "@/store/modal";
import {Log,Location} from "./log.js";
import { useRef, useState } from "react";
import Loader from "@/components/loader/loader";
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



export default function Kokocoin({ close,balance,country }) {
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [load,setLoad] = useState(false)
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };

  const pan = Gesture.Pan()
  .runOnJS(true)
    .onBegin(() => {
      'worklet';
      pressed.value = true;
      console.log("done oo");
    })
    .onChange((event) => {
      'worklet';
      offset.value = event.translationY;
      console.log(event.translationY)
     
    })
    .onEnd(() => { 
      'worklet';
      offset.value = withSpring(0);
      pressed.value = false;
      if(offset.value > 200){
        try{
          close()
        }
        catch(error){
          console.error("error while closing",error)
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));


  const refThrough = (el) => {
  
    headerRef.current = el;
  };

  const handleSubmit = async () => {
    if(parseInt(balance) < parseInt(quantity)) {
      alert("You have insufficient balance for this transaction")
      return
    }
    setLoad(true)
    close()
    try {
     const response = await Log(quantity);
     alert("Successfully swapped")
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoad(false)
    }
  };


  return (
    <>
        <Modal transparent={true} >
        <GestureHandlerRootView style={{ flex: 1 }}>
        <Pressable
          ref={modalRef}
          onPress={(event) => closeUp(event)}
          className="fixed inset-0 z-[5000] backdrop-blur-sm bg-setgray bg-opacity-50 w-screen min-h-screen h-auto flex flex-col justify-end md:justify-center disable overscroll-y-contain items-center"
        >
          <Animated.View
            className="bg-white h-auto w-full flex flex-col items-center pt-4 px-3 pb-10 rounded-t-[20px] relative md:w-40 md:rounded-md"
            style={[animatedStyle]}
          >
            <GestureDetector gesture={pan}>
            <View
              className="w-full h-14 py-1 absolute top-0 left-0  overflow-y-contain"
            >
              
              <View className="w-full h-auto px-2 flex items-center justify-center">
                <View className="w-16 h-[6px] bg-mycolor rounded-full"></View>
              </View>
            
            
              <View className="w-full h-auto px-2 justify-center items-center flex py-1">
                <Text className="font-interbold text-md"> Balance: {currency(country)} {balance} </Text>
              </View>
            </View>

            </GestureDetector>

            <View className="w-full h-auto mt-16 overflow-y-auto flex flex-col items-center">
              <View className="w-full h-auto mb-3">
                
              </View>
              <View className="w-full h-auto mb-3 flex items-center">
                <Image
                  source={require("../../assets/images/Layer_1.png")}
                  className="w- rounded-full animate-pin"
                />
              </View>

              <View className="w-half h-auto mt-3 flex items-center justify-between rounded-md border-slate-300 border-[0.2px] flex-row">
                <TouchableOpacity
                  className="w-12 h-9 text-white text-md rounded-md bg-mycolor disabled:bg-yellow-200 flex items-center justify-center"
                  disabled={quantity === 1}
                  onPress={() => setQuantity((quantity) => quantity - 1)}
                >
                 <Text className="text-md font-intermedium">-</Text> 
                </TouchableOpacity>
                <Text
                  className="text-center font-interbold text-md"
                >{quantity}</Text>
                <TouchableOpacity
                  className="w-12 h-9 text-white text-md rounded-md bg-mycolor flex justify-center items-center"
                  onPress={() => setQuantity((quantity) => quantity + 1)}
                >
                 <Text className="text-md font-intermedium">+</Text>
                </TouchableOpacity>
              </View>
              <Text className="text-[11px] font-inter text-slate-500">
                {" "}
                Numbers of Kokocoin to buy
              </Text>
              <View className="w-full h-auto my-3 px-3">
                <TouchableOpacity
                  className="w-full bg-mycolor h-auto py-2 rounded-lg text-md font-intermedium text-white flex flex-row items-center justify-center"
                  onPress={() => handleSubmit()}
                >
                  <Text className="font-interbold text-lg text-white">Swap for {currency(country)} {filter(quantity,country)}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </Pressable>
        </GestureHandlerRootView>
        </Modal>
       
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