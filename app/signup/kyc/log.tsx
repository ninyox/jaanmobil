import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const Log = async (
  name: string, username: string, phone: string, country: string, date: string | DateConstructor, gender: string
) => {
  const token = await AsyncStorage.getItem("temptoken")
  const postData = JSON.stringify({
    name,
    username,
    phone,
    country,
    date,
    gender,
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/user/signup/kyc`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      throw error.response.data;
    } else {
      const load = {
        success: false,
        message: "Something went wrong while signing you up",
      };
      throw load;
    }
  }
};

export const Store = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token)
    return 'success'
  }
  catch (error) {
    const idan = 'failed';
    throw idan
  }
}