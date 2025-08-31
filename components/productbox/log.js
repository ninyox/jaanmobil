import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const url = "https://api.korakota.com/api/v1/fetch-banner";
const token = AsyncStorage.getItem('token')
export const Log = async () => {
  try {
    const response = axios.get(url);
    const result = (await response).data;
    return result;
  } catch (error) {
    throw error;
  }
};
