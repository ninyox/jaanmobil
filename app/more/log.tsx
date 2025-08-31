import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const fetchurl = "https://api.korakota.com/api/v1/fetch";

export const Log = async (token: string) => {
  try {
    const response = await BaseUrl.get(`/api/v1/user/details`, {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    return mydata;
  } catch (error) {
    throw error;
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

export const SaveImages = async (images:any) => {
  try {
    const formData = new FormData();
    formData.append("file", images);
    const response = await axios.post(
      "http://localhost:3001/uploadpics",
      formData
    );
    const result = response.data;
    if (result.success === true) {
      const link = `https://pics.korakota.com/${result.data}`;
      return link;
    }
  } catch (error) {
    throw error;
  }
};