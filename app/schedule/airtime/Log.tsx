import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl, BaseUrl } from "@/constants";
export const Log = async ({
  provider,
  phone,
  amount,
  frequency,
  date,
  payment
}: {
  provider: string;
  phone: string | undefined;
  amount: string | undefined;
  frequency:string,
  date:Date,
  payment:string
}) => {
  const token = await AsyncStorage.getItem("token");
  const postData = JSON.stringify({
    provider,
    phone,
    amount,
    frequency,
    date,
    payment
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/schedule/airtime`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    } else {
      throw {
        message: "Unable to Schedule Airtime , Try Again Later!",
      };
    }
  }
};
