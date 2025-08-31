import { Text, TouchableOpacity, View } from "react-native";

export default function CouponProp({ firstname, secondname, useValue, value }: { firstname: string, secondname: string, useValue: (value: string) => void, value: string }) {

    return (
        <>
            <View className="w-full h-12 flex-row items-center justify-around">
                <TouchableOpacity className={`${value === "airtime" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("airtime")}>
                    <Text className={`${value === "airtime" ? "text-white" : "text-black dark:text-white"} font-interbold text-[12px]`}>{firstname}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${value === "data" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("data")}>
                    <Text className={`${value === "data" ? "text-white" : "text-black dark:text-white"} font-interbold text-[12px]`}>{secondname}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}