import axios from "axios";

const url = "https://api.korakota.com/api/v1/boost-ad";
const token =
  typeof window !== "undefined"
    ? window.localStorage.getItem("token")
    : false;

export async function Log(product,duration) {
    const formData = new URLSearchParams()
    formData.append('product', product.trim())
    formData.append('duration', duration.trim())
  try {
      const response = await axios.post(url,formData.toString(),{
        headers:{
            'Authorization':token
        }
      })
      const result = response.data;
      console.log(result)
      return result
  } catch (error) {
    throw error
  }
}


export const Location = async () => {
  try {
    const response = await axios.get('https://api.korakota.com/api/v1/getlocation');
    const result = response.data;
   // console.log(result,"me i don see")
    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};