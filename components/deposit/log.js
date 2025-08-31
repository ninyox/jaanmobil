import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const url = "https://api.korakota.com/api/v1/createinvoice";


export async function Log(quantity) {
  const token = await AsyncStorage.getItem("token")
    const formData = new URLSearchParams()
    formData.append('quantity', quantity)
    formData.append('name', "Deposit")
  try {
      const response = await axios.post(url,formData.toString(),{
        headers:{
            'Authorization':token
        }
      })
      const result = response.data;
      if(result.success === true){
          return result.data
      }
  } catch (error) {
    throw error
  }
}


export const Location = async () => {
  try {
    const response = await axios.get('https://api.korakota.com/api/v1/getlocation');
    const result = response.data;
   // console.log(result,"me i don see")
    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};