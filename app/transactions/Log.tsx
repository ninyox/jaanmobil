import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
export const Log = async ({reference}: {reference: string}) => {
  const token = await AsyncStorage.getItem("token");
  const postData = JSON.stringify({
    reference
  })
    const response = await BaseUrl.post(
      "/api/v1/user/transactions/reference",postData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    return response.data;
};
