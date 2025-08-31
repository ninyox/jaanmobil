import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const url = "https://api.korakota.com/api/v1/changepassword";

export const Log = async (current,newpassword) => {
  const token = await AsyncStorage.getItem("token")
  try {
    const formData = new URLSearchParams();
    formData.append("current", current.trim());
    formData.append("newpassword",newpassword.trim() );
    const response = await axios.post(url,formData.toString(),{
        headers:{
            'Authorization':token
        }
    });
    return response.data;
  } catch (error) {
    throw error
  }
};
