import { View } from "react-native";
import Footer from "@/components/footer/page";
import Header from "@/components/header/page";
import { useState, useEffect } from "react";
import { router } from "expo-router";
interface User {
  id: number;
  userid: string;
  credit: number;
  email: string;
  country: string;
  name: string;
  username: string;
  phone: string;
  birthdate: string;
  gender: string;
  password: string;
  bankname: string;
  accountnumber: string;
  accountname: string;
  pin: number;
  jtoken: number;
  signup: boolean;
}
import { Banner, Log, Tick } from "./log";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomView from "../../components/customview/index";
import Loader from "../../components/loader/loader";
import { Advert, Balance, Bills, Historye } from "./props";
const version = 31;
import { UpdateModal } from "@/components/feedModal/feedModal";
import { useToast } from "@/store/toast";
import {useQuery} from "@tanstack/react-query"
import axios from "axios";
export default function Home() {
  const { openToast } = useToast();
  const [update, setUpdate] = useState(false);
  const [accountname, setAccountname] = useState("JAAN/SEDI RAHEEM");
  const [accountnumber, setAccountnumber] = useState("996280291");
  // const [isLoading, setIsloading] = useState(false);
  const [eye, setEye] = useState(false);
  const [bal, setBal] = useState<number>(0);
  // const [response, setResponse] = useState<User | null>(null);
  const [realbal, setReal] = useState<number | undefined>(bal);
  const [product, setProduct] = useState([]);

  const {data:response,isLoading,error} = useQuery({
    queryKey:['balance'],
    queryFn:async() => {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.push("../login/login");
      }
      const response = await Log(token || "")
      if(response.success){
        return response.data
      }
      else{
        throw new Error(response.message)
      }
      // catch((error) => {
      //   if (error && error.message) {
      //     throw new Error(error.message)
      //   }else {
      //     throw new Error("Connection Failure")
      //   }
      // })
    }
  })
  if(isLoading){
   return <Loader isLoading={isLoading}/>
  }
  // if(error){
  //   openToast(error.message)
  //   return
  // }
  // const fetchData = async () => {
  
  //   try {
  //     const token = await AsyncStorage.getItem("token");
  //     if (!token) {
  //       router.push("../login/login");
  //     }
  //     if (token) {
  //       const result = await Log(token);
  //       if (result.success === true) {
  //         setResponse(result.data);
  //         if (accountnumber) {
  //           // openToast(
  //           //   "It seems like you do not have an bank account generated for you , kindly go to Account and generate an account",
  //           // );
  //         }
  //         if (response?.pin) {
  //           await AsyncStorage.setItem("pin", response.pin.toString());
  //         }
  //         setRight(true);
  //       } else {
  //         // openToast(result.message);
  //       }
  //     }
  //   } catch (error: any) {
  //     // alert(error.message);
  //     //router.replace('/login')
  //   } finally {
  //     // setIsloading(false);
  // };
  //   try {
  //     return
  //     const token = await AsyncStorage.getItem("token");
  //     const result = await Tick(token !== null ? token : "");
  //     if (result.success === true) {
  //       const { text, status } = result.data[0];
  //       if (status === "active") {
  //         setTickertext(text || "");
  //         setTickeron(true);
  //         setAlertmodal(true);
  //       }
  //     }
  //   } catch (error) {}
  //   try {
  //     return
  //     const token = await AsyncStorage.getItem("token");
  //     const result = await Banner(token ? token : "");
  //     if (result.success === true) {
  //       const proceed = result.data;
  //       setProduct(proceed);
  //     }
  //   } catch (error) {
  //   } finally {
  //     // setIsloading(false);
  //   }
  // };
  const checkChange = async () => {
    return
    const checkupdate = await AsyncStorage.getItem("checkupdate");
    if (checkupdate) {
      setUpdate(true);
      return;
    }
  };
  const check = async () => {
    return
    try {
      const token = await AsyncStorage.getItem("token");
      await axios
        .get("https://api.jaan.ng/api/v1/version", {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          const mydata = response.data;
          if (mydata.success) {
            const seedata = parseInt(mydata.data, 10);
            if (seedata >= version) {
              checkChange();
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("cant get transaction");
    }
  };
  // useEffect(() => {
  //   fetchData();
  //   check();
  // }, []);



  return (
    <>
      <CustomView>
        <View className="w-screen h-auto flex bg-white dark:bg-dark items-center flex-col pb-10">
          <Header name={response?response.username:""} />
          <Balance
            points={response ? response.jtoken : 0}
            accountname={response ? response.accountname : ""}
            accountnumber={response ? response.accountnumber : ""}
            bankname={response ? response.bankname : ""}
            bal={response?.credit}
          />
          <Bills />
          <Advert product={product || []} />
          <Historye />
        </View>
        {update && <UpdateModal close={() => setUpdate(false)} />}
      </CustomView>
      <Footer selected="home" />
    </>
  );
}
function setTickertext(arg0: any) {
  throw new Error("Function not implemented.");
}

function setTickeron(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setAlertmodal(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setRight(arg0: boolean) {
  throw new Error("Function not implemented.");
}
