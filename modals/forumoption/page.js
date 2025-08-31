import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Alert,
  Modal,
} from "react-native";
import * as Clipboard from "expo-clipboard";

import useModal from "@/store/modal";
import { useRef } from "react";
import Log from "./log.js";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useAuth from "../../store/authstore.jsx";
export default function Chatoption({
  close,
  xpos,
  ypos,
  messageid,
  deletemsg,
}) {
  const { authId } = useAuth();
  const userd = authId;
  const modalRef = useRef();
  const { showModal, handleOpenModal, handleCloseModal } = useModal();
  const closeUp = (event) => {
    if (modalRef.current === event.target) {
      close();
    }
  };

  const deletebutton = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message"
    );
    if (confirmed) {
      const response = await Log(messageid.id);
      if (response) {
        deletemsg(messageid.id);
        alert("deleted");
      } else {
        alert("Unable to delete message");
      }
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(
      messageid.message === "" ? messageid.imageurl : messageid.message
    );
    alert("Copied");
  };
  return (
    <>
      <Modal transparent>
        <TouchableOpacity
          ref={modalRef}
          onPress={(event) => closeUp(event)}
          className="fixed inset-0 z-[5000] backdrop-blur-sm bg-yellow-00 bg-opacity-50 w-full h-full "
        >
          <View
            style={{
              position: "absolute",
              top: ypos,
              left: xpos,
              backgroundColor: "#36454f",
            }}
            className="absolute  w-40 rounded-md flex flex-col items-center py-4 "
          >
            {messageid.sender === userd && (
              <TouchableOpacity
                className="w-full h-auto flex items-center border-white border-b px-2 justify-between py-1"
                onPress={() => deletebutton()}
              >
                <Text className="text-red-500 font-intermedium text-md mx-2">
                  Delete
                </Text>
                <MaterialIcons
                  name="delete"
                  size={18}
                  className="fill-red-500 ml-2"
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              className="w-full h-auto flex items-center border-white border-b px-2 py-1 justify-between "
              onPress={() => copy()}
            >
              <Text className="text-white font-intermedium text-md mx-2">
                Copy
              </Text>
              <Ionicons name="copy" size={18} className="fill-white ml-2" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
