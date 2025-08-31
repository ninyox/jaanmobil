import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { styles } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthIcon from '../authIcon';
import { router } from 'expo-router';
import { BackButton } from '../icons/icons';
interface Props {
    visible: boolean;
    close: () => void;
    submit: () => void;
    name?: string;
}

export default function Pinmodal({ visible, close, submit, name }: Props) {
    const [inputs, setInputs] = useState(['', '', '', '']);
    const [filledInput, setFilled] = useState<number>(0)
    const [incorrect, setIncorrect] = useState("")
    const Submit = async (key: string) => {
        const pin = await AsyncStorage.getItem("pin");
        console.log("see pin o", pin)
        const joinedpincode = inputs.join("");
        const combinedpin = joinedpincode + key;
        const pincode = combinedpin
        if (pin === pincode) {
            submit()
            setInputs(['', '', '', ''])
            close()
        }
        else {
            setIncorrect("Incorrect Pin!")
        }
    };
    const handleKeyPress = (key: string) => {

        const updatedInput = [...inputs];
        const emptyinputindex = updatedInput.findIndex((digit) => digit === '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = key;
            setInputs(updatedInput)
            if (emptyinputindex === 3) {
                setIncorrect("")
                Submit(key)
                
            }

        }
    };
    const handleDeletePress = () => {
        setIncorrect("")
        const updatedInput = [...inputs].reverse();
        const emptyinputindex = updatedInput.findIndex((digit) => digit !== '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = '';
            setInputs(updatedInput.reverse())
        }
        /*
        if(emptyinputindex < 3) {
            inputsRefs[emptyinputindex - 1 ]
        }
        */
    };
    useEffect(() => {
        setFilled(inputs.filter(str => str.trim() !== "").length)
    }, [inputs])
    return (
        <>
            <Modal visible={visible} animationType="fade" transparent={true}>
                <View className='w-screen flex-1 bg-white dark:bg-dark min-h-full h-auto flex flex-col justify-between px-2'>
                    <View id='first box' className='w-full'>
                        <View className="w-full items-center flex-row justify-between mb-6 mt-2 border-b-[0.2px] py-4 border-gray-300">
                            <BackButton />
                            <Text className="text-sixt font-intermedium text-gray-900 dark:text-white">
                                {name || "Transaction Pin"}
                            </Text>
                            <Text></Text>
                        </View>
                        <View className='w-full px-1'>
                            <Text className='text-xl font-interbold dark:text-white my-2'>Enter 4 Digit Pin</Text>
                            <Text className='text-twelve font-intermedium text-graytext'>Enter your 4 digit pin to confirm purchase</Text>
                        </View>
                        <View className='w-full flex-row items-center justify-center my-6'>
                            {
                                <>
                                    <Pressable className={`w-5 h-5 mx-2 rounded-full ${incorrect ? "bg-red-500" : filledInput > 0 ? "bg-mycolor" : "bg-gray-300"}`} />
                                    <Pressable className={`w-5 h-5 mx-2 rounded-full ${incorrect ? "bg-red-500" : filledInput > 1 ? "bg-mycolor" : "bg-gray-300"}`} />
                                    <Pressable className={`w-5 h-5 mx-2 rounded-full ${incorrect ? "bg-red-500" : filledInput > 2 ? "bg-mycolor" : "bg-gray-300"}`} />
                                    <Pressable className={`w-5 h-5 mx-2 rounded-full ${incorrect ? "bg-red-500" : filledInput > 3 ? "bg-mycolor" : "bg-gray-300"}`} />
                                </>

                            }
                        </View>
                        <Text className="text-red-500 text-lg font-intermedium text-center ">{incorrect}</Text>
                    </View>
                    <View id='second box' className="w-full h-auto">
                        <Text className="text-red-600 text-center text-sixt font-intermedium" onPress={() => router.push("/security/pin")}>Forgot Pin?</Text>

                        <View className='w-full h-auto flex-row flex-wrap my-10 justify-around' >
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('1')} ><Text className='font-interbold text-2xl'>1</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('2')}><Text style={{ fontWeight: 700, fontSize: 23 }} >2</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('3')}><Text style={{ fontWeight: 700, fontSize: 23 }} >3</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('4')}><Text style={{ fontWeight: 700, fontSize: 23 }} >4</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('5')}><Text style={{ fontWeight: 700, fontSize: 23 }} >5</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('6')}><Text style={{ fontWeight: 700, fontSize: 23 }} >6</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('7')}><Text style={{ fontWeight: 700, fontSize: 23 }} >7</Text></TouchableOpacity>
                            <TouchableOpacity className='w-[32%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center mb-2' onPress={() => handleKeyPress('8')}><Text style={{ fontWeight: 700, fontSize: 23 }} >8</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.numpres} onPress={handleDeletePress} ><Text className='text-black dark:text-red-500'><Feather name='delete' size={23} /></Text></TouchableOpacity>

                            <TouchableOpacity className='w-[33%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center' onPress={() => handleKeyPress('9')}><Text style={{ fontWeight: 700, fontSize: 23 }} >9</Text></TouchableOpacity>

                            <TouchableOpacity className='w-[33%] h-[50px] bg-white dark:bg-lightdark rounded-md justify-center flex items-center' onPress={() => handleKeyPress('0')}><Text style={{ fontWeight: 700, fontSize: 23 }} >0</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.numpreso} onPress={() => handleDeletePress()}>
                                <AuthIcon success={() => {
                                  submit()
                                  setInputs(['', '', '', ''])
                                  close()
                                }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}


