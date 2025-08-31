import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiUrl, BaseUrl } from "@/constants";
export const BuyLog = async ({
  amount,
  email,
}: {
  amount: number;
  email: string;
}) => {
  const token = await AsyncStorage.getItem("token");
  const formData = JSON.stringify({
    amount,
    email,
  });

  try {
    const response = await BaseUrl.post("/api/v1/service/voucher/buy",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }else {
      throw {
        message:"Unable to process your request currently, Try Again Later"
      }
    }
  }
};

export const RedeemLog = async ({ voucherid }: { voucherid: string }) => {
  const token = await AsyncStorage.getItem("token");
  const formData = JSON.stringify({
    voucherid,
  });

  try {
    const response = await BaseUrl.post(`/api/v1/service/voucher/redeem`,
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }else {
      throw {
        message:"Unable to process your request currently, Try Again Later"
      }
    }
  }
};
