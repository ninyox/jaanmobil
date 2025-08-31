import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const url = "https://api.korakota.com/api/v1/reportad";

export const Log = async (advertid, reason, context) => {
  const token = await AsyncStorage.getItem("token")
  try {
    const formData = new URLSearchParams();
    formData.append("advertid", advertid);
    formData.append("reason", reason);
    formData.append("context", context);
    const response = await axios.post(url, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = response.data;
    return result;
  } catch (error) {
    throw error;
  }
};
