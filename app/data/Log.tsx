import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
export const Log = async (
  provider: string,
  datacode: string,
  phone: string | undefined,
  plan:string,
) => {
  const token = await AsyncStorage.getItem("token");
  const postData = JSON.stringify({
    provider,
    datacode,
    phone,
    plan
  });
  try {
    const response = await BaseUrl.post(
      `/api/v1/service/data/purchase`,
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
    console.log(error);
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    } else {
      throw {
        message: "Unable to Purchase Data Plans , Try Again Later!",
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
    const response = await BaseUrl.post(
      `/api/v1/service/data/fetch`,
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
