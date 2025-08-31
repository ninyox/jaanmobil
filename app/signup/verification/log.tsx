import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";

export const Log = async (
  code: number, token: any,email:string
) => {
  const postData = JSON.stringify({
    code,
    email
  });
  console.log(postData)
  try {
    const response = await BaseUrl.post(
      `/api/v1/user/auth/checkcode`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      }
    );
    console.log("see response", response.data)
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

export const Resend = async (token: any
) => {

  try {
    const response = await BaseUrl.get(
      `/api/v1/user/signup/emailcode/resend`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
      }
    );
    console.log("see response", response.data)
    return response.data
  } catch (error) {
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