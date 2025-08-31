import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
export const Log = async ({
  productCode,
  account,
  phone,
}: {
  productCode: string;
  account: string;
  phone: string;
}) => {
  const token = await AsyncStorage.getItem("token");
  let data = JSON.stringify({
    productCode,
    account,
    phone: phone,
  });
  try {
    const response = await BaseUrl.post(`/api/v1/service/jamb/purchase`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }
    throw error;
  }
};

export const Fetch = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await BaseUrl.get(`/api/v1/service/jamb/fetch`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }
    throw error;
  }
};

export const Verify = async ({
  account,
  productcode,
}: {
  account: string;
  productcode: string;
}) => {
  const token = await AsyncStorage.getItem("token");
  const datag = JSON.stringify({
    productcode,
    account,
  });
  try {
    const response = await BaseUrl.post(`/api/v1/service/jamb/verify`, datag, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data;
    }
    throw error;
  }
};
