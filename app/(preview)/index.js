import { View, Text, Image, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
const deal = require('@/assets/images/logo.png')

export default function Preview () {
    const handletime = async() =>{
        setTimeout(() => {
         router.push('home')
        }, 1000);
    }
   
    useEffect(() => {
       // handleLogin()
      // handletime()
    }, [])
    return (
        <>
            <View className="flex-1 items-center justify-center" >
                <Image source={deal} className="h-20"/>
            </View>
        </>
    )
}