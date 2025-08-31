import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default async function Log(load) {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get(
      "https://api.jaan.ng/api/v1/transactions",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const data = response.data.data;
    let reversedArray = data.slice().reverse();
    if (reversedArray) {
      console.log(reversedArray);
      const thearray = reversedArray.filter((item) => item.service === load);
      return thearray;
    }
  } catch (error) {
    throw error;
  }
}
