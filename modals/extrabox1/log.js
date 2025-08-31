import axios from "axios";
const url = 'https://api.korakota.com/api/v1/customads';
export const Log = async (category,search,state) => {
    try {
        const formData = new URLSearchParams()
        formData.append('category', category)
        formData.append('search', search)
        formData.append("state",state)
       // console.log(formData,category,state,search)
        const response = axios.post(url, formData.toString())
        const result = (await response).data;
      //  console.log(result,"see result")
        return result
    }
    catch (error) {
        throw(error)
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