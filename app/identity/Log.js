import React, { useState } from "react";
import axios from "axios";

export const Log = async (type, number) => {
  const token = await AsyncStorage.getItem("token");
  const pincode = await AsyncStorage.getItem("pin");
  const formData = new URLSearchParams();
  formData.append(`type`, type);
  formData.append(`number`, number);

  try {
    const response = await axios.post(
      "https://api.jaan.ng/api/v1/identity",
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
