import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {  BaseUrl } from "@/constants";
export const Log = async (provider: string, phone: string | undefined, amount: string | undefined) => {
  const token = await AsyncStorage.getItem("token");
  const postData = JSON.stringify({
    provider,
    phone,
    amount,
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/service/airtime/purchase`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );

    const mydata = response.data;

    return mydata;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    } else {
      throw {
        message: "Unable to Purchase Airtime , Try Again Later!",
      };
    }
  }
};
