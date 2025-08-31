import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
interface logProps {
  provider: string;
  accountnumber: string; 
  amount: number; 
  serviceType: string; 
  mobile: string; 
  plan: string;
  payment:string;
  date:Date;
  frequency:string,
}
export const Log = async ({provider,accountnumber,amount,serviceType,mobile,plan,payment,frequency,date}:logProps) => {
  const token = await AsyncStorage.getItem("token");
const formData = JSON.stringify({
  provider,
  account:accountnumber,
  amount,
  serviceType,
  phone:mobile,
  plan,
  payment,
  date,
  frequency,
  
})

  try {
    const response = await BaseUrl.post(
      "/api/v1/service/schedule/electric",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    const mydata = response.data;

    return mydata;
  } catch (error) {
   if(error instanceof AxiosError){
    throw error.response?.data;
   }
   throw error;
  }
};

export const Fetch = async () => {
  const token = await AsyncStorage.getItem("token");

  try {
    const response = await BaseUrl.get(
      "/api/v1/service/electric/fetch",
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
  if(error instanceof AxiosError){
    throw error.response?.data;
  }
    throw error;
  }
};

export const Validate = async ({meter,provider}:{meter:string,provider:string}) => {
    const token = await AsyncStorage.getItem('token') || "love"
    const postData = {
        "accountnumber":meter,
        "provider": provider
    }
    try {
        const response = await BaseUrl.post('/api/v1/service/electric/verify', postData, {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        const mydata = response.data;
        console.log(mydata)
        return mydata;
    }

    catch (error) {
        console.log(error)
        if(error instanceof AxiosError){
          throw error.response?.data;
        }
        throw error;
    }
}
