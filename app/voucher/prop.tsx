import { Text, TouchableOpacity, View } from "react-native";

export default function CouponProp({ firstname, secondname, useValue, value }: { firstname: string, secondname: string, useValue: (e:string) => void, value: string }) {

    return (
        <>
            <View className="w-full h-12 flex-row items-center justify-around">
                <TouchableOpacity className={`${value === "buy" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("buy")}>
                    <Text className={`${value === "buy" ? "text-white" : "text-black dark:text-white"} text-[12px] font-interbold `}>{firstname}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${value === "redeem" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("redeem")}>
                    <Text className={`${value === "redeem" ? "text-white" : "text-black dark:text-white"} text-[12px] font-interbold`}>{secondname}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}