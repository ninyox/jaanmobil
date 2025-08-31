import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl } from "@/constants";
export const Log = async (number: string, type: string) => {
  const token = await AsyncStorage.getItem("token");
  const formData = new URLSearchParams()
  formData.append("idnumber", number)
  formData.append("type", type)
  console.log(formData);

  try {
    const response = await axios.post(
      `${ApiUrl.link}/api/v1/user/generatebank`,
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }
  }
};
