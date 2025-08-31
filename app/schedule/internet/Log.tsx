import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl, BaseUrl } from "@/constants";
export const Log = async ({
  provider,
  phone,
  datacode,
  plan,
  amount,
  frequency,
  date,
  payment
}: {
  provider: string;
  phone: string | undefined;
  datacode: string | undefined;
  plan: string | undefined;
  amount: string | undefined;
  frequency:string,
  date:Date,
  payment:string
}) => {
  const token = await AsyncStorage.getItem("token");
  const postData = JSON.stringify({
    provider,
    phone,
    datacode,
    plan,
    amount,
    frequency,
    date,
    payment
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/schedule/internet`,
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
        message: "Unable to Schedule Internet , Try Again Later!",
      };
    }
  }
};

export const Validate = async (provider: string) => {
  const token = (await AsyncStorage.getItem("token")) || "love";
  const postData = JSON.stringify({
    provider,
  });
  try {
    const response = await axios.post(
      `${ApiUrl.link}/api/v1/service/data/fetch`,
      postData,
      {
        maxBodyLength: Infinity,
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
        message: "Unable to Fetch Data Plans , Try Again Later!",
      };
    }
  }
};