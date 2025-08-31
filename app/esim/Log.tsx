import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '@/constants';
export const Log = async ({name, productCode, productId, walletId, providerId, value,country,countryCode, phone }: { name:string, productCode: string, productId: number, walletId: string, providerId: number, value: number,country:string,countryCode:string, phone: string }) => {
  const token = await AsyncStorage.getItem('token')
  let data = JSON.stringify({
    name,
    productCode,
    productId,
    walletId,
    providerId,
    value,
    country,
    countrycode:countryCode,
    phone
  });
  try {
    const response = await BaseUrl.post(`/api/v1/service/esim/purchase`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
    })
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      return error.response?.data;
    }else{
      throw {
        message:"Unable to process transaction at the moment"
      }
    }
  }
};


export const Validate = async (code:string) => {
    const token = await AsyncStorage.getItem('token') || "love"
    try {
      const response = await BaseUrl.get(`/api/v1/service/esim?country=${code}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        const mydata = response.data;
        return mydata;
    }

    catch (error) {
        const responsed = {
            message: 'rejected',
            data: error
        }

        throw responsed
    }
}

export const Price = async (plans) => {
    const token = await AsyncStorage.getItem('token')
    try {
        const response = await axios.get(`https://api.jaan.ng/api/v1/getprice`, {
            headers: {
                'Authorization': token
            }
        });
       
        return response.data;
    }
    catch (error) {
       throw error?.response.data
    }
}

export const Verify = async (plans,numbers) => {
    const token = await AsyncStorage.getItem('token')
    const datag = JSON.stringify({
        plans:plans,
        numbers:numbers
    })
    try {
        const response = await axios.post(`https://api.jaan.ng/api/v1/verifycable`,datag, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
       
        return response.data;
    }
    catch (error) {
       throw error?.response.data
    }
}
/*
message: "Successfully logged in as peterninyo4@gmail.com (devglo) !"
success: true
token: "92|nzaeOuoek4bnLNUuao5LjYUltcPXFJNtc0AkwYS9aa5bce3b"
user:
account:
balance: "673.00"
bonus: "0.00"
created_at: "2023-11-02T11:22:07.000000Z"
id: 3
package: "smart"
pin: null
reserved_accounts: "[{\"bankCode\":\"035\",\"bankName\":\"Wema bank\",\"accountNumber\":\"9512724587\",\"accountName\":\"Dev\"},{\"bankCode\":\"50515\",\"bankName\":\"Moniepoint Microfinance Bank\",\"accountNumber\":\"6417608328\",\"accountName\":\"Dev\"}]"
updated_at: "2023-11-11T23:03:47.000000Z"
user_id: "3"
[[Prototype]]: Object
created_at: "2023-11-02T11:22:07.000000Z"
email: "peterninyo4@gmail.com"
email_verified_at: null
id: 3
last_ip: "102.88.36.109"
last_login: "2023-11-12 04:55:33"
name: "Developer Glo"
phone: "08123456789"
ref_code: "864536"
referrer: null
role: "user"
status: "active"
updated_at: "2023-11-12T10:03:11.000000Z"
username: "devglo"
*/