
import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isAxiosError } from "axios";
export const Log = async (
  email: string,
  password: string
) => {
  const postData = JSON.stringify({
    email,
    password
  });

  try {
    const response = await BaseUrl.post(
      `/api/v1/user/login`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data && response.data?.success) {
      Store(response.data.data)
    }
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error?.response?.data) {
      throw error?.response.data
    } else {
      const load = {
        success: false,
        message: "Something went wrong while logging you in",
      };
      throw load;
    }
  }
};

export const Store = async (token: any) => {
  try {
    await AsyncStorage.setItem('temptoken', token)
    return 'success'
  }
  catch (error) {
    const idan = 'failed';
    throw idan
  }
}

