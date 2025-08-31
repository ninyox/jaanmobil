import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrl } from '@/constants';
export const Log = async (name, identifier, nairaAmount, dollarAmount, text) => {
    const token = await AsyncStorage.getItem('token')
    const postData = JSON.stringify({
        "giftname": name,
        "kudaIdentifier": identifier,
        "email": text,
        "amount": dollarAmount,
        "nairaAmount":nairaAmount
    });

    console.log("see post data",postData);
    try {
        const response = await axios.post('http://localhost:8080/api/v1/buygiftcard', postData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        });
        const mydata = response.data;
        return mydata;
    } catch (error) {
        console.log(error)
        throw error?.response?.data;
    }
};
export const Validate = async (numbers, type) => {
    const token = await AsyncStorage.getItem('token') || "love"
    const postData = {
        "number": numbers,
        "type": type
    }
    try {
        const response = await axios.post('http://localhost:8080/api/v1/verifyelectric', postData, {
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
        const responsed = {
            message: 'rejected',
            data: error?.response?.data,
        };

        throw responsed;
    }
}
export const Getprice = async () => {
    const token = await AsyncStorage.getItem('token') || "love"
    try {
        const response = await axios.get('http://localhost:8080/api/v1/getprice', {
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
        const responsed = {
            message: 'rejected',
            data: error?.response?.data,
        };

        throw responsed;
    }
}
export const Fetch = async () => {
    const token = await AsyncStorage.getItem('token')

    try {
        const response = await BaseUrl.get('/api/v1/service/giftcard', {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        const mydata = response.data;
        console.log(mydata, "looo");
        return mydata;
    }

    catch (error) {
      console.log(error)
        throw error?.response?.data;
    }
}