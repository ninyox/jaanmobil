import { BaseUrl } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
const Store = async (mydata:any) => {
  try {
    
    if (mydata !== undefined) {
      AsyncStorage.setItem("@user",JSON.stringify(mydata))
      const {
        username,
        credit: balance,
        phone: phonenumber,
        email,
        name: firstname,
        accountname,
        accountnumber,
        bankname,
        pin,
      } = mydata;

      AsyncStorage.setItem("username", username);
      AsyncStorage.setItem("balance", balance.toString());
      AsyncStorage.setItem("firstname", firstname);
      AsyncStorage.setItem("phonenumber", phonenumber);
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("accountname", accountname);
      AsyncStorage.setItem("bankname", bankname);
      AsyncStorage.setItem("accountnumber", accountnumber);
      if (pin) {
        AsyncStorage.setItem("pin", pin.toString());
      }

      console.log("User data stored successfully", username);
      return "success";
    }
    return "empty";
  } catch (error) {
    const idan = "failed";
    throw idan;
  }
};

export const getPin = async () => { };
export const Log = async (token: string) => {
  console.log("got here ", token)
  try {
    const response = await BaseUrl.get(`/api/v1/user/details`, {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    if(mydata.success){
      Store(mydata.data)
    }
    return mydata;
  } catch (error) {
    if(error instanceof AxiosError){
       throw error?.response?.data;
    }
    else {
      throw {
        success:false,
        message:"No internet Connection"
      }
    }
   
  }
};
export const Tick = async (token:string | null) => {
  
  try {
    const response = await axios.get("https://api.jaan.ng/api/v1/getpopup", {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    if (mydata.success === true) {
      return mydata;
    }
  } catch (error) {
    throw error;
  }
};
export const Banner = async (token:string|null) => {
  try {
    const response = await axios.get("https://api.jaan.ng/api/v1/getadverts", {
      headers: {
        Authorization: token,
      },
    });
    const mydata = response.data;
    console.log(mydata)
    return mydata;
  } catch (error) {
    throw error;
  }
};