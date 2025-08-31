"use client";
import axios from 'axios'
import { router } from 'expo-router';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from 'expo-web-browser';
const logo = require("../../assets/images/logos.jpeg");
const glogo = require("../../assets/images/glogo.png")
export const Logo = () => {
  return (
    <View className="logotop w-full h-auto pb-4 cursor-pointer ">
      <Image source={logo} className="w-40 h-10" onPress={() => router.push("/")} />
    </View>
  );
};

export const Googlelogo = () => {
  WebBrowser.maybeCompleteAuthSession()
  const useProxy = true;
  const redirectUrl = AuthSession.makeRedirectUri({
    native:"koramobile://redirect",
    useProxy
  })
  
  const handleGoogle = async () => {
    try {
      const formData = new URLSearchParams()
      formData.append("system","mobile")
      const response = await axios.post("https://api.korakota.com/api/v1/request",formData.toString());
      const data = response.data;
      console.log(data, "see data o"); 
      const dataurl = data.url;
      WebBrowser.openAuthSessionAsync(dataurl,redirectUrl)
    } catch (error) {
      alert("error");
      console.log(error);
    }
  };
  return (
    <TouchableOpacity
      className="logotop w-full h-auto py-3 rounded-md border-slate-300 border mx-4 my-3 flex flex-row items-center justify-center"
      onPress={() => handleGoogle()}
    >
      <Image source={glogo} className="w-7 mr-3" />
      <Text className="font-intermedium text-lg dark:texdt-white">Google</Text>
    </TouchableOpacity>
  );
};
