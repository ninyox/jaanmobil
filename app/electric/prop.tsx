import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
interface Prop {

    firstname: string;
    secondname: string;
    firstvalue:string;
    secondvalue:string;
    useValue: (e: string) => void;
    value: string;
}
export default function HeaderProp({ firstname, secondname, firstvalue, secondvalue, useValue, value }: Prop) {

    return (
        <>
            <View className="w-full h-12 flex-row items-center justify-around">
                <TouchableOpacity className={`${value === firstvalue ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue(firstvalue)}>
                    <Text className={`${value === firstvalue ? "text-white" : "text-black dark:text-white"} text-twelve font-interbold `}>{firstname}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${value === secondvalue ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue(secondvalue)}>
                    <Text className={`${value === secondvalue ? "text-white" : "text-black dark:text-white"} text-twelve font-interbold`}>{secondname}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}