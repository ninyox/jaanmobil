import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const url = "https://api.korakota.com/api/v1/deletemessage";

export default async function Log(id) {
  const token = await AsyncStorage.getItem("token")

    const formData = new URLSearchParams()
    formData.append('id', id)
  try {
      const response = await axios.post(url,formData.toString(),{
        headers:{
            'Authorization':token
        }
      })
      const result = response.data;
     // console.log(result)
      if(result.success === true){
       return true
      }
  } catch (error) {
    throw error
  }
}
