import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"
export const Log = async (username, password) => {
  const postData = {
    username: username,
    password: password,
  };

  try {

    const response = await axios.post('https://api.jaan.ng/api/v1/login', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.data.success === true) {
       Store(response.data.data) 
    }
    return response.data
  }
  catch (error) {
      console.log(error)
      throw error?.response?.data
  }
}

export const Store = async (token) => {
  try {
    await AsyncStorage.setItem('token', token)
    return 'success'
  }
  catch (error) {
    const idan = 'failed';
    throw idan
  }
}

