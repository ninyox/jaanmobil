'use client'
import { View, Text, Modal, Pressable, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";
import { useEffect, useRef } from "react";
import { BlurView } from "expo-blur";
import { Image } from "react-native";
import { IconImage } from "@/assets/images";
interface ToastProps {
    text: string,
    title: string,
    boolean: boolean,
    onClose: () => void
}
const { width: SCREEN_WIDTH } = Dimensions.get("window")
export const Toast = ({ text, title = "", onClose }: ToastProps) => {
    const click = useRef(null)
    const handleClick = (event: any) => {
        if (click.current === event.target) {
            onClose()
        }
    }
    const animatedWidth = useRef(new Animated.Value(0)).current
    useEffect(() => {
        Animated.spring(animatedWidth, {
            toValue: SCREEN_WIDTH * 0.75,
            useNativeDriver: false,
            friction: 5,
            tension: 80,
        }).start()
    }, [])
    return (
        <Modal transparent={true} >
            <BlurView style={styles.dealers} intensity={30} >
                <Pressable ref={click} onPress={handleClick} className="flex flex-col justify-center items-center z-[999] w-screen h-screen">
                    <Animated.View style={{ width: animatedWidth }} className=" rounded-xl min-h-24 h-auto bg-white flex relative flex-col items-center justify-around border-mycolor border py-1">
                      
                        <View className="w-full h-auto overflow-x-auto mt-3 px-7">
                            <Text className="font-interbold text-slate-900 text-center text-lg mb-2">{title || ''}</Text>
                            <Text className="font-intermedium text-slate-900 text-center text-lg">{text || 'successful'}</Text>
                        </View>

                        <TouchableOpacity className="w-9/12 h-12 flex flex-row items-center justify-center bg-mycolor rounded-xl my-5" onPress={() => onClose()}>
                            <Text className="text-white text-lg font-interbold">OK</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Pressable>
            </BlurView>
        </Modal>
    )
};
export const styles = StyleSheet.create({
    box: {
        backgroundColor: "#ffffff",
        borderRadius: 90,
        borderWidth: 3,
        borderColor: "#ffffff",
    },
    dealers: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "#00000090",
    },
});
