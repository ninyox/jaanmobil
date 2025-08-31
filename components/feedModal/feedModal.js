import React, { useState, useEffect } from 'react';
import { styles } from './style';
import { View, Text, Pressable, Image, ScrollView, ActivityIndicator, Modal, Linking, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const images = require('@/assets/icon.png')


export const UpdateModal = ({ close }) => {
    return (
        <Modal visible={true} transparent={true} animationType='slide' >
            <View className="flex-1 justify-between items-center bg-white w-screen h-screen dark:bg-gray-950">
                <View className="justify-between items-center flex-col w-full h-auto mt-10">
                    <Image source={images} className="w-5/12 h-36 rounded-md"  />
                    <Text className="text-2xl my-10 font-interbold dark:text-white"> Update Required</Text>
                    <Text className="text-center font-intermedium text-md mt-2 w-11/12 dark:text-white"> We know that updating your app can be a hassle, but we've made some important changes. Please update to the latest version to keep using Jaan mobile App. </Text>
                </View>
                <View className="w-full h-auto flex flex-col items-center" >
                    <Pressable className="w-9/12 rounded-xl justify-center items-center mb-5 border-2 bg-mycolor h-12 " onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.gloriousd.jaanmobile')}>
                        <Text className="text-white text-md font-interbold">Update</Text>
                    </Pressable>
                    <Pressable className="w-8/12 rounded-xl justify-center items-center mb-10 border-2 border-mycolor h-12" onPress={async() => {
                        close()
                       await AsyncStorage.setItem("checkupdate","true")
                    } }>
                        <Text className="text-mycolor font-interbold">Not Now</Text>
                    </Pressable>

                </View>
            </View>
        </Modal>
    )
}

// export const VerifyModal = ({ isShow, close }) => {
//     const [token, setToken] = useState('')

//     useEffect(() => {

//         const fetchData = async () => {
//             try {
//                 const token = await AsyncStorage.getItem('token')
//                 console.log('retrieved into profile');
//                 setToken(token)
//             } catch (error) {
//                 console.log('Error rerieving profile',error);
//             }
//         }
//         const unsubscribe = navigation.addListener('focus', fetchData);
//         return unsubscribe;
//     }, []);
//     const navigation = new useNavigation()

//     return (
//         <Modal visible={isShow} transparent={true} animationType='slide' >
//             <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
//                 <View style={styles.firstbox}>
//                     <Image source={images} style={styles.images} />
//                     <Text style={styles.bigtext}> Verification Required</Text>
//                     <Text style={styles.smalltext}> KYC Verification was enforced by CBN for all virtual account creation to prevent fraud, This would only take you a few seconds. Kindly click verify to continue </Text>
//                 </View>
//                 <View style={styles.secondbox}>
//                     <Pressable style={styles.button} onPress={() => navigation.navigate('Verify',{token})}>
//                         <Text style={styles.pleasewait}>Verify</Text>
//                     </Pressable>
//                     <Pressable style={styles.buttono} onPress={close()}>
//                         <Text style={styles.notnow}>Other options</Text>
//                     </Pressable>

//                 </View>
//             </View>
//         </Modal>
//     )
// }

// export const NotifyModal = ({ isShow, text, close }) => {
//     return (
//         <Modal visible={isShow} transparent={true} animationType='slide' >
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <View style={styles.boxcenter}>
//                     <View style={styles.textcont}>
//                         <Text style={styles.text}>{text}</Text>
//                     </View>
//                     <View style={styles.downbox}>
//                         <Pressable style={styles.closebutton} onPress={close()}>
//                             <Text style={styles.pleasewait}> Close</Text>
//                         </Pressable>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     )
// }