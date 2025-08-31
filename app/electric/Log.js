import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Log = async (plan, mobile) => {
   // console.log("see plans",plans)
   // const plan = JSON.parse(plans)
    const token = await AsyncStorage.getItem('token')
    const pincode = await AsyncStorage.getItem('pin')
    let network;

    if (plan.network.toLowerCase() === 'mtn') {
        network = '1';
    } else if (plan.network.toLowerCase() === 'airtel') {
        network = '4';
    } else if (plan.network.toLowerCase() === 'glo') {
        network = '2';
    } else if (plan.network.toLowerCase() === '9mobile') {
        network = '3';
    }
    const formData = new URLSearchParams();
    formData.append(`netcode`, network);
    formData.append(`dataplan`, plan.dataid);
    formData.append(`number`, mobile);
    formData.append(`dataamount`, plan.amount);
    formData.append('pincode', pincode);
    try {
        const response = await axios.post('http://localhost:8080/api/v1/buydata', formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token
            }
        })
        const mydata = response.data;  
        return mydata;
       
    } catch (error) {
        console.log(error)
        const responsed = {
            message: 'rejected',
            data: error?.response?.data,
        };

        throw responsed;
    }
};



export const Validate = async (numbers, type) => {
    const token = await AsyncStorage.getItem('token') || "love"
    const postData = {
        "number":numbers,
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
        const response = await axios.get('http://localhost:8080/api/v1/getprice',{
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
export const Fetch = async (plans, numbers, type) => {
    const token = await AsyncStorage.getItem('token')

    try {
        const response = await axios.get('http://localhost:8080/api/v1/getelectric', {
            maxBodyLength: Infinity,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        })
        const mydata = response.data;
        console.log(mydata,"looo");
        return mydata;
    }

    catch (error) {
        throw error?.response?.data;
    }
}