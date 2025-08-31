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
import Loader from "@/components/loader/loader";
import useToast from "@/store/toast";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Log } from "./log.js";
import { Toast } from "@/components/toast/toast.tsx";
import { MaterialIcons } from "@expo/vector-icons";
import Customview from "../../components/customview/index.tsx";

export default function Post() {
  const { showModal, handleOpenModal, handleCloseModal } = new useModal();
  const { openToast, closeToast, toastmessage, showToast } = new useToast();
  const [error, setError] = useState(false);
  const router = useRouter();
  const [current, setCurrent] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");



  const handleSubmit = async () => {
    if (newpassword === "" || newpassword.length < 6) {
      alert("New Password is Empty or too short");
      return;
    }
    if (current === "" || current.length < 6) {
      alert("Current password is empty or too short");
      return;
    }
    if (confirmpassword.trim() !==  newpassword.trim()) {
      alert("Password is not the same");
      return;
    }
 
    handleOpenModal()
    try {
      const response = await Log(
        current,
        newpassword,
      );

      if (response.success) {
        setError(true)
        openToast(response.message);
      }
      else {
        openToast(response.message)
      }
    } catch (error) {
      openToast("Currently Unable to submit your withdrawal request.");
    }
    finally{
      handleCloseModal()
    }
  };

  return (
    <>
    <Customview>
    <View className="w-screen flex flex-col items-center min-h-screen h-auto dark:bg-gray-950 bg-[url('/background.png')] bg-cover dark:bg-[url('/darkbg.png')]">
   
   <View className="w-full md:w-3/5 lg:w-2/5 flex flex-col items-center min-h-screen h-auto dark:bg-gray-950 md:border md:rounded-md md:mt-3 md:flex-grow md:min-h-max bg-white">
     <View
       aria-label=" Header"
       className="w-full h-10 flex justify-start items-center bg-blue-0 px-2 m-2 flex-row border-b-[0.2px] dark:border-gray-500"
     >
       <MaterialIcons
         name="arrow-back-ios"
         size={20}
         color="gray"
         className="fill-black dark:fill-white"
         onPress={() => router.back()}
       />
       <Text className="text-lg font-semibold dark:text-white">Change Password</Text>
   
     </View>


     <View className="w-full flex-grow flex flex-col">
       <View
         aria-label="Adverts"
         className="h-auto w-full borer border-slate-100 rounded-xl flex flex-col items-center py-2 px-4 my-2"
       >
         <View className="w-full h-auto">
           <Text className="font-interbold text-md dark:text-gray-200">
             Change Your Password
           </Text>
         </View>

         <View className="flex flex-col border-slate-300 rounded-lg w-full h-auto items-center py-1 my-2">
           <View className="border w-full h-auto px-2 py-1 my-3 border-bk rounded-lg dark:border-gray-300">
             <Text className="text-sm font-inter dark:text-white">Current Password</Text>
             <TextInput
               placeholder=""
               className="outline-none text-sm font-inter bg-transparent w-full h-8 rounded-md px-2 dark:text-white"
               value={current}
               onChangeText={(e) => setCurrent(e)}
             />
           </View>

           <View className="border w-full h-auto px-2 py-1 my-3 border-bk rounded-lg dark:border-gray-300">
             <Text className="text-sm font-inter dark:text-white">New Password</Text>
             <TextInput
               placeholder=""
               className="outline-none text-sm font-inter bg-transparent w-full h-8 rounded-md px-2 dark:text-white"
               value={newpassword}
               onChangeText={(e) => setNewpassword(e)}
             />
           </View>
           <View className="border w-full h-auto px-2 py-1 my-3 border-bk rounded-lg dark:border-gray-300">
             <Text className="text-sm font-inter dark:text-white">Confirm New Password</Text>
             <TextInput
               placeholder=""
               className="outline-none text-sm font-inter bg-transparent w-full h-8 rounded-md px-2 dark:text-white"
               value={confirmpassword}
               onChangeText={(e) => setConfirmpassword(e)}
             />
           </View>
         </View>
       </View>
       <View className="w-full h-auto px-4 py-1 pt-10">
         <TouchableOpacity
           onPress={() => handleSubmit()}
           className="w-full bg-mycolor h-12 rounded-md font-interbold flex items-center justify-center"
         >
           <Text className="text-white font-interbold text-lg">Submit</Text>
         </TouchableOpacity>
       </View>
     </View>
   </View>
 </View>
    </Customview>
    
      {showModal && <Loader />}
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
