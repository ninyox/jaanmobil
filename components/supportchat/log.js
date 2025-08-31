const url = "https://api.korakota.com/api/v1/getforums";
const profileurl = "https://api.korakota.com/api/v1/fetch";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;
import axios from "axios";
export async function Log(params) {
  try {
    const formData = new URLSearchParams();
    formData.append("params", params);
    const response = axios.post(url, formData.toString(), {
      headers: {
        Authorization: token,
      },
    });
    const result = (await response).data;
    if (result.success) {
      return result.data;
    }
  } catch (error) {
    throw error
  }
}

export async function Profile() {
  try {
    const response = axios.get(profileurl,{
      headers:{
        'Authorization':token
      }
    });
    const result = (await response).data;
    if (result.success === true) {
      const resu = result.data;
      return resu;
    }
  } catch (error) {
    throw error
  }
}

export const Location = async () => {
  try {
    const response = await axios.get('https://api.korakota.com/api/v1/getlocation', {
      headers: {
        Authorization: token,
      },
    });
    const result = response.data;
    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};