import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const url = "https://api.korakota.com/api/v1/retrievechats";


const Log = async () => {
 // console.log("reached api")
  const token = await AsyncStorage.getItem("token");
 // console.log("Reached API");
  try {
    //console.log("Making request to URL:", url);
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
  //  console.log("Got response"); // This log should indicate the request succeeded
    const result = response.data;
  //  console.log("Result:", result); // Log the entire result
    if (result.success) {
    //  console.log("Success:", result.data); // Log the success case
      return result.data;
    } else {
     // console.log("Request was not successful");
    }
  } catch (error) {
   // console.log("Error occurred", error.message); // Log the error message
    throw error; // Throw the error again to be handled by the calling function
  }
};

export default Log;
