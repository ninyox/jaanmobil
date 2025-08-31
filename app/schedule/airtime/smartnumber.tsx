import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { AirtelSvg, GloSvg, MtnSvg, NineMobileSvg } from "@/assets/svg";
const networkarray = [
  {
    name: "Mtn Network",
    source: <MtnSvg width="100%" />,
    value: "mtn",
  },
  {
    name: "Glo Network",
    source: <GloSvg width="100%" />,
    value: "glo",
  },
  {
    name: "9mobile Network",
    source: <NineMobileSvg width="100%" />,
    value: "ninemobile",
  },
  {
    name: "Airtel Network",
    source: <AirtelSvg width="100%" />,
    value: "airtel",
  },
];
export function SmartModal({ submit, net,phone }:{submit:Function,net:Function,phone:string}) {
  const fetchData = async () => {
    const checkRecent = await AsyncStorage.getItem("@user");
    if (!checkRecent) {
      console.log("doesnt exist");
      return;
    }
    const parsedArray = JSON.parse(checkRecent);
    const storedNumber = parsedArray.phone;
    const phoneAndNetwork = detectNetwork(storedNumber)
    const value = networkarray.filter(item => item.value === phoneAndNetwork.network)
    console.log(value)
    net(value[0] || networkarray[0])
    submit(phoneAndNetwork.phone)
    
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  const setNetwork = async () => {
    
    const phoneAndNetwork = detectNetwork(phone)
    const value = networkarray.filter(item => item.value === phoneAndNetwork.network)
    console.log(value)
    net(value[0] || networkarray[0])
  };
  
  useEffect(() => {
    if(!phone || phone.length < 4){
      return
    }else{
    setNetwork(); 
    }
  }, [phone]);
  return (
    <></>
  )
}



const detectNetwork = (number: string) => {
  const cleaned = number.replace(/\D/g, "");
  const MTN_PREFIXES = [
    "0703",
    "0706",
    "0803",
    "0806",
    "0810",
    "0813",
    "0814",
    "0816",
    "0903",
    "0906",
  ];
  const AIRTEL_PREFIXES = [
    "0701",
    "0708",
    "0802",
    "0808",
    "0812",
    "0901",
    "0902",
    "0904",
    "0907",
  ];
  const GLO_PREFIXES = ["0705", "0805", "0807", "0811", "0815", "0905"];
  const NINEMOBILE_PREFIXES = ["0809", "0817", "0818", "0908", "0909"];
  let phone = cleaned;
  if(phone.startsWith("0")){
    phone = cleaned
  }else{
    phone = "0"+ cleaned
  }
  const prefix = phone.substring(0,4)
  console.log("this is the prefix")
  
  if (MTN_PREFIXES.includes(prefix)) {
    return {
      network: "mtn",
      phone
    }
  }
  if(GLO_PREFIXES.includes(prefix)){
    return {
      network: "glo",
      phone
    }
  }
  if(AIRTEL_PREFIXES.includes(prefix)){
    return {
      network: "airtel",
      phone
    }
  }
  if(NINEMOBILE_PREFIXES.includes(prefix)){
    return {
      network: "ninemobile",
      phone
    }
  }
  return {
    network: "mtn",
    phone
  }
};
