import Loader from "@/components/loader/loader";
import { BaseUrl } from "@/constants";
import { useToast } from "@/store/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Pressable, View } from "react-native";

export default function CouponModal() {
  const [voucherid, setVoucherid] = useState("");
  const [info, setInfo] = useState("");
  const [isDisabled,setIsDisabled] = useState(true)
  const [isLoading,setIsLoading] = useState(false)
  const {openToast}= useToast()

  useEffect(() => {
    if (voucherid.length < 5) {
      setInfo("Please Enter a valid Voucher ID");
      setIsDisabled(true)
    }else{
      setInfo("")
      setIsDisabled(false)
    }
  }, [voucherid]);
  
  async function handleSubmit(){
    const token = await AsyncStorage.getItem("token")
    if(!token){
      router.push("/login/login")
    }
    const formData = JSON.stringify({
      voucherid
    })
    try{
      const {data} = await BaseUrl.post("/api/v1/service/voucher/redeem", formData.toString(),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      if(data.success){
        openToast(data.message)
      }
    }catch(error:any){
      if(error && error?.response.data){
        openToast(error?.response?.data?.message)
      }else{
        openToast("Unable to Process this request")
      }
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <>
      <View className="w-full h-full py-4 flex-col justify-between">
        <Pressable className="w-full h-auto flex-col items-center">
          <Text className="text-center font-interbold text-[16px] dark:text-white">
            Redeem Voucher
          </Text>
     

          <View className="w-full flex justify-around h-auto mt-4">
            
            <View className="w-full h-24">
              <Text className="font-intermedium text-gray-800 dark:text-white text-md my-1">
                Enter Voucher ID
              </Text>

              <TouchableOpacity className="w-full h-16 px-2 border-[0.1px] border-gray-500 rounded-lg flex flex-row items-cener justify-between">
                <TextInput
                  value={voucherid}
                  onChangeText={(e) => setVoucherid(e)}
                  placeholder="JAN1234"
                  className="flex-grow dark:text-white"
                />
              </TouchableOpacity>
            </View>
            
          </View>
            
            
          <Pressable className="w-full h-auto">
            <Text className="font-intermedium text-blue-400 text-[12px] mt-2">
             {info}
            </Text>
          </Pressable>
        </Pressable>

        <Pressable className="w-full h-auto flex flex-col items-center">
          <TouchableOpacity onPress={() => handleSubmit()} disabled={isDisabled} className="w-11/12 h-14 bg-mycolor disabled:bg-[#6b34ff80] rounded-2xl flex items-center justify-center">
            <Text className="font-interbold text-white text-lg">Redeem</Text>
          </TouchableOpacity>
        </Pressable>
      </View>
      <Loader isLoading={isLoading}/>
    </>
  );
}
