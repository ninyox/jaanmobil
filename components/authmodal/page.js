import { Logo, Googlelogo } from "@/components/misc/comps";
import { View, Text, Modal, Pressable } from "react-native";
import useModal from "@/store/modal";
import { useRef } from "react";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
export default function Authmodal({ close, visible }) {
  const modalRef = useRef();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };
  return (
    <>
      <Modal visible={visible} animationType="slide" transparent={true}>
        <Pressable ref={modalRef} onPress={closeUp} className="flex flex-col justify-end items-center bg-setgray w-screen h-screen">
          <View className="bg-white w-full h-auto min-h-[500px] rounded-t-[20px] flex flex-col items-center pt-4 px-3 pb-10 md:w-2/4 lg:w-1/3 md:rounded-[20px]">
              <Logo />
              <View className="w-full px-4">
                <Text className="font-intermedium text-lg">Sign In</Text>
              </View>
              <Googlelogo />
              <View className="theorbox my-4 flex flex-row justify-center items-center w-full">
                <View className="border-[0.2px] border-slate-300 flex-grow dark:border-gray-700"></View>
                <Text className="mx-3 font-inter">or</Text>
                <View className="border-[0.2px] border-slate-300 flex-grow dark:border-gray-700"></View>
              </View>
              <View className="w-full flex justify-center">
                <TouchableOpacity
                  onPress={() => router.push("login")}
                  className="w-full py-4 my-2 text-white text-center h-auto bg-yellow-500 rounded-lg text-md font-intermedium flex flex-row items-center justify-center"
                >
                  <Text className="text-white font-intermedium text-lg">
                    Sign in with Email
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="w-full h-auto flex flex-row items-center justify-center my-5 ">
                <Text className="">
                  Are you new to{" "}
                  <Text className="font-interbold">Korakota</Text>?{" "}
                </Text>
                <Text onPress={() => router.push("register")} className="text-yellow-600 font-intermedium">
                  {" "}
                  Register
                </Text>
              </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}