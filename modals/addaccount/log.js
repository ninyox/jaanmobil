const url = "https://api.korakota.com/api/v1/addsocial";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;
import axios from "axios";
export async function Log(profile,postlink) {
    const formData = new URLSearchParams();
    formData.append("profile",profile);
    formData.append("postlink",postlink)
    formData.append("type","facebook")
  try {
    const response = axios.post(url, formData.toString(),{
        headers:{
            "Authorization":token
        }
    });
    const result = (await response).data;
    console.log(result,"lmaoo");
    return result;
  } catch (error) {
   throw error
  }
}
