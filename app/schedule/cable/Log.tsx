import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl, BaseUrl } from "@/constants";
export const Log = async ({
  provider,
  plan,
  month,
  amount,
  cardnumber,
  datacode,
  frequency,
  date,
  payment
}: {
  provider: string;
  plan: string | undefined;
  cardnumber: string | undefined;
  month: string | undefined;
  amount: number | undefined;
  datacode: string | undefined;
  frequency:string,
  date:Date,
  payment:string
}) => {
  const token = await AsyncStorage.getItem("token");
  const postData = JSON.stringify({
    provider,
    plan,
    month,
    amount,
    recipient:cardnumber,
    code:datacode,
    frequency,
    date,
    payment
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/schedule/cable`,
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

export const Validate = async (provider: string) => {
  const token = (await AsyncStorage.getItem("token")) || "love";
  const postData = JSON.stringify({
    provider,
  });
  try {
    const response = await axios.post(
      `${ApiUrl.link}/api/v1/service/cable/fetch`,
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