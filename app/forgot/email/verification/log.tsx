import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError, isAxiosError } from "axios";

export const Log = async (code: number, email: any) => {
  const postData = JSON.stringify({
    code,
    email,
  });
  try {
    const response = await BaseUrl.post(
      `/api/v1/user/auth/checkcode`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.data.success) {
      await Store(response.data.data);
    }
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.data) {
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

export const Resend = async (email: string | string[]) => {
  const postData = JSON.stringify({
    email,
  });
  try {
    const response = await BaseUrl.post(
      `/api/v1/user/auth/forgot`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      throw error?.response.data;
    } else {
      const load = {
        success: false,
        message: "Something went wrong while getting verification code",
      };
      throw load;
    }
  }
};

export const Store = async (token: string) => {
  try {
    await AsyncStorage.setItem("temptoken", token);
    return "success";
  } catch (error) {
    const idan = "failed";
    throw idan;
  }
};
