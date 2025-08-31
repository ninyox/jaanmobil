import axios from "axios";
const url = "https://api.korakota.com/api/v1/reset";

export const Log = async (email) => {
  try {
    const formData = new URLSearchParams();
    formData.append("email", email.trim());
    const response = await axios.post(url,formData.toString());
    console.log(response)
    return response.data;
  } catch (error) {
    console.log(error)
    throw error
  }
};
