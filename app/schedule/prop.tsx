import { Text, TouchableOpacity, View } from "react-native";

export default function ScheduleProp({ firstname, secondname, useValue, value }: { firstname: string, secondname: string, useValue: (e:string) => void, value: string }) {

    return (
        <>
            <View className="w-full h-12 flex-row items-center justify-around">
                <TouchableOpacity className={`${value === "airtime" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("airtime")}>
                    <Text className={`${value === "airtime" ? "text-white" : "text-black dark:text-white"} text-[12px] font-interbold `}>{firstname}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${value === "bills" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("bills")}>
                    <Text className={`${value === "bills" ? "text-white" : "text-black dark:text-white"} text-[12px] font-interbold`}>{secondname}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}