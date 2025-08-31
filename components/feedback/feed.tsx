

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
} from "react-native";
import React from "react";
import { CheckMarkSvg } from "@/assets/svg";
interface Props {
  modalVisible: boolean;
  closeModal: () => void;
  fact: boolean;
  title?: string;
  modalContent: string;
}
export default function Feedmodal({ modalVisible, closeModal, fact, title, modalContent }: Props) {
  return (
    <>
      <Modal
        visible={modalVisible}
        transparent={true}
        //style={{ backgroundColor: "red", flex: 1 }}
        onRequestClose={closeModal}
        animationType="slide"
      >
        <View className="absolute flex flex-col items-center justify-between top-0 left-0 bottom-0 right-0 flex-1 bg-mycolor h-[100%] ">
          <Text></Text>
          <View className="w-10/12 h-auto items-center justify-around">
            <CheckMarkSvg name="checkmark-circle"  size={160} color="green" />
            <Text className="font-interbold leading text-center text-white text-2xl mt-7">{ title || "Success!"}</Text>
            <Text className="font-inter text-white leading text-center text-md mt-2 w-11/12">{modalContent}</Text>
          </View>

          <TouchableOpacity className={`bg-white w-4/5 h-14 flex items-center justify-center rounded-[16px] mb-14`} onPress={() => closeModal()}>
            <Text className="font-interbold text-mycolor text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  )
}