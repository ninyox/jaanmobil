import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Log = async (couponid) => {
  const token = await AsyncStorage.getItem("token");
  const formData = JSON.stringify({
    "couponid": couponid,

  });

  console.log(formData);

  try {
    const response = await axios.post(
      "https://api.jaan.ng/api/v1/redeemcoupon",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error?.response.data;
  }
};
