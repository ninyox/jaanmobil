"use client";
import {
  View,
  Text,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import useModal from "@/store/modal";
import { Toast } from "../toast/toast.tsx";
import useToast from "@/store/toast";
import { useEffect, useRef, useState } from "react";
import { Log } from "./log.js";
import { router } from "expo-router";
export default function Footermodal({ close, sort, visible }) {
  const { openToast, closeToast, toastmessage, showToast } = new useToast();
  const [error, setError] = useState(false);
  const modalRef = useRef();
  const headerRef = useRef();
  const [startY, setstartY] = useState(0);
  const [sorts, setSort] = useState("Trending");
  const [trend, setTrend] = useState(false);
  const [email, setemail] = useState("");
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };

  const handleSubmit = async () => {
    if (email === "" || email.length < 6) {
      alert("email address empty or too short");
      return;
    }
    try {
      const response = await Log(email);
      if (response.success) {
        setError(true);
        openToast(response.message);
      } else {
        setError(false);
        openToast(response.message);
      }
    } catch (error) {
      setError(false);
      openToast("Currently unable to reset your password, try again later");
    }
  };

  return (
    <>
      <Modal visible={visible} transparent={true}>
        <Pressable
          ref={modalRef}
          onPress={closeUp}
          className="flex flex-col justify-end items-center bg-setgray w-screen h-screen"
        >
          <KeyboardAvoidingView style={{justifyContent:"flex-end"}} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View className="bg-white h-auto w-screen flex flex-col items-center pt-2 px-3 rounded-t-[20px] justify-between sm:w-2/5 sm:rounded-[20px] sm:border-2 sm:border-mycolor pb-6 sm:pb-0 lol:bg-gray-900 lol:border-gray-500">
            <View className="w-full h-10 py-1 border-b-[0.5px] lol:border-gray-500">
              <View className="w-full h-auto px-2 flex items-center justify-center">
                <View className="w-16 h-[6px] bg-mycolor rounded-full"></View>
              </View>
            </View>

            <View className="w-full h-auto pb-5">
              <View className="w-full h-auto my-5 flex justify-between flex-col">
                <Text className="font-interbold my-3">
                  Enter your email
                </Text>
                <TextInput
                  type="text"
                  checked={email}
                  onChange={(e) => setemail(e)}
                  className="w-full h-10 rounded-lg bg-slate-100"
                />
              </View>
              <View className="w-full h-auto my-3 flex justify-between px-10">
                <TouchableOpacity
                  onClick={() => handleSubmit()}
                  className="w-full h-10 bg-mycolor rounded-lg text-md font-intermedium justify-center items-center"
                >
                  <Text className="font-interbold my-3 text-white">Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          </KeyboardAvoidingView>
        
        </Pressable>
      </Modal>
      {showToast && (
        <Toast
          boolean={error}
          text={toastmessage}
          onClose={() => closeToast()}
        />
      )}
    </>
  );
}
