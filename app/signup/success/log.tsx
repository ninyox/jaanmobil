import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// export default async function Log(firstname, lastname, email, phone, password,referral) {
//     const formData = new URLSearchParams()
//     formData.append('firstname', firstname)
//     formData.append('lastname', lastname)
//     formData.append('email', email)
//     formData.append('phonenumber', phone)
//     formData.append('password', password)
//     formData.append('referral', referral)
//     try {
//         const response = await axios.post('https://api.korakota.com/api/v1/signup', formData.toString())
//         const result = response.data
//         return result
//     }
//     catch (error) {
//        console.log(error)
//         throw error?.response?.data
//     }
// }
export const Log = async (
    email: string,
    phone: string,
    password: string,
    referrer: string
  ) => {
    const postData = JSON.stringify({
      email: email,
      phone: phone,
      password: password,
      referrer: referrer || "",
    });
  
    try {
      const response = await axios.post(
        "https://api.jaan.ng/api/v1/signup",
        postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.data.success === true) {
        const result = await Store(response.data.data);
        if (result === "success") {
          return response.data;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        throw error.response.data;
      } else {
        const load = {
          success: false,
          message: "Something went wrong while signing you up",
        };
        throw load;
      }
    }
  };

  export const Store = async (token: string) => {
    try {
      await AsyncStorage.setItem('token', token)
      return 'success'
    }
    catch (error) {
      const idan = 'failed';
      throw idan
    }
  }