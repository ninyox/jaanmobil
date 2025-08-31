import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Log = async (amount, email) => {
  const token = await AsyncStorage.getItem("token");
  const pincode = await AsyncStorage.getItem("pin");
  const formData = new URLSearchParams()
   formData.append("amount",amount)
   formData.append("email", email)
  

  console.log(formData);

  try {
    const response = await axios.post(
      "https://api.jaan.ng/api/v1/createcoupon/",
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error?.response.data;
  }
};
