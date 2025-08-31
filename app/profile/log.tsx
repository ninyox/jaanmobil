import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
const url = "https://api.korakota.com/api/v1/updatepics";
const fetchurl = "https://api.korakota.com/api/v1/fetch";

export const Log = async (token: string) => {
  console.log("got here ", token)
  try {
    const response = await BaseUrl.get(`/api/v1/user/details`, {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    return mydata;
  } catch (error) {
    if(error instanceof AxiosError){
       throw error?.response?.data;
    }
    else {
      throw {
        success:false,
        message:"No internet Connection"
      }
    }
   
  }
};

export const Fetchp = async () => {
  const token = await AsyncStorage.getItem("token")
    try {
      const response = await axios.get(fetchurl,{
          headers:{
              'Authorization':token
          }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log(error)
      throw error
    }
  };

export const SaveImages = async (images) => {
  try {
    const formData = new FormData(); // Use FormData instead of URLSearchParams
    formData.append("file", images);
    const response = await axios.post(
      // Await the axios.post() call
      "http://localhost:3001/uploadpics",
      formData
    );
    const result = response.data;
    // console.log(result)
    if (result.success === true) {
      const link = `https://pics.korakota.com/${result.data}`;
      return link;
    }
  } catch (error) {
    // console.log(error)
    throw error;
  }
};