import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
export const Log = async () => {
  const token = await AsyncStorage.getItem("token");
  const response = await BaseUrl.get("/api/v1/user/notification/fetch", {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  return response.data.data;
};

export const Update = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const postData = JSON.stringify({
      reference: "",
      type: "all",
    });
    const { data } = await BaseUrl.post(
      "/api/v1/user/notification/update",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    return data;
  }catch(error){
    throw error
  }
};
