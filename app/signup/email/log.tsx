import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
import { AxiosError } from "axios";

export const Log = async (
  email: string,
) => {
  const postData = JSON.stringify({
    email: email,
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/user/signup/email`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data,"see response")
    if (response.data.success === true) {
      await Store(response.data.data);
    }
    return response.data
  } catch (error) {
    console.error(error)
    if (error instanceof AxiosError && error?.response?.data) {
      throw error?.response.data;
    } else {
      const load = {
        success: false,
        message: "Something went wrong while signing you up",
      };
      throw load;
    }
  }
};

export const Store = async (token: any) => {
  try {
    await AsyncStorage.setItem('temptoken', token)
  }
  catch (error) {

    throw error
  }
}