import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Log = async (netcode, mobile, amount) => {
  const token = await AsyncStorage.getItem("token");
  const pincode = await AsyncStorage.getItem("pin");
  const formData = new URLSearchParams();
  formData.append(`netcode`, netcode);
  formData.append(`number`, mobile);
  formData.append(`amount`, amount);
  formData.append("pincode", pincode);
  console.log(formData);

  try {
    const response = await axios.post(
      "https://api.jaan.ng/api/v1/buyairtime",
      formData.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: token,
        },
      }
    );

    const mydata = response.data;

    return mydata;
  } catch (error) {
    const responsed = {
      message: "rejected",
      data: error.response?.data,
    };
    throw responsed;
  }
};
