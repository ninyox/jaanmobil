import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl } from "@/constants";
export const Log = async (couponid:string) => {
  const token = await AsyncStorage.getItem("token");
  const formData = JSON.stringify({
    "amount": couponid,
  });
  try {
    const response = await axios.post(
      `${ApiUrl.link}/api/v1/service/jtoken/convert`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      throw error?.response?.data;
    }
    else {
      throw {
        message:"Internal Server Error"
      }
    }
    
  }
};
