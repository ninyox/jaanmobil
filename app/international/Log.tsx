import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUrl } from "@/constants";
export const Log = async ({
  provider,
  cardnumber,
  code,
  month,
  plan
}: {
  provider: string;
  cardnumber: string;
  code: string;
  month: string;
  plan: string;
}) => {
  const token = await AsyncStorage.getItem("token");
  let data = JSON.stringify({
    provider,
    cardnumber,
    code,
    month,
    plan
  });
  console.log(data);
  try {
    const response = await BaseUrl.post(
      `/api/v1/service/cable/purchase`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Process Cable TV Transactions",
      };
    }
  }
};

export const Validate = async ({ provider }: { provider: string }) => {
  const token = (await AsyncStorage.getItem("token")) || "love";
  const postData = {
    provider,
  };
  try {
    const response = await BaseUrl.post(
      `/api/v1/service/cable/fetch`,
      postData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    const mydata = response.data;
    return mydata;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Fetch Cable TV Plans",
      };
    }
  }
};

export const FetchCountry = async () => {
  const token = (await AsyncStorage.getItem("token")) || "love";
  try {
    const response = await BaseUrl.get(
      `/api/v1/service/intl/country`,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    const mydata = response.data;
    return mydata;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Fetch Cable TV Plans",
      };
    }
  }
};


export const FetchOperators = async ({code}:{code:string}) => {
  const token = (await AsyncStorage.getItem("token")) || "love";
  
  try {
    const formData = JSON.stringify({
      countrycode:code
    })
    const response = await BaseUrl.post(
      `/api/v1/service/intl/operators`,formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    const mydata = response.data;
    return mydata;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Fetch Cable TV Plans",
      };
    }
  }
};

export const FetchProducts = async ({code,id}:{code:string,id:number}) => {
  const token = (await AsyncStorage.getItem("token")) || "love";
  
  try {
    const formData = JSON.stringify({
      countrycode:code,
      operatorid:id
    })
    const response = await BaseUrl.post(
      `/api/v1/service/intl/products`,formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );
    const mydata = response.data;
    return mydata;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Fetch Cable TV Plans",
      };
    }
  }
};

export const Price = async () => {
  const token = await AsyncStorage.getItem("token");
  try {
    const response = await axios.get(`https://api.jaan.ng/api/v1/getprice`, {
      headers: {
        Authorization: token,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Process Cable TV Transactions",
      };
    }
  }
};

export const Verify = async (code:string, numbers:string) => {
  const token = await AsyncStorage.getItem("token");
  const datag = JSON.stringify({
    country: code,
    accountnumber: numbers,
  });
  try {
    const response = await BaseUrl.post(
      `/api/v1/service/intl/verify`,
      datag,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    } else {
      throw {
        message: "Unable To Verify this number",
      };
    }
  }
};
