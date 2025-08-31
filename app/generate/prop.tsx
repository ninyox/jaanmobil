
import { Text, TouchableOpacity, View } from "react-native";
interface Prop {
    firstname: string;
    secondname: string;
    useValue: (e: string) => void;
    value: string
}
export default function HeaderProp({ firstname, secondname, useValue, value }: Prop) {

    return (
        <>
            <View className="w-full h-12 flex-row items-center justify-around">
                <TouchableOpacity className={`${value === "nin" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("nin")}>
                    <Text className={`${value === "nin" ? "text-white" : "text-black dark:text-white"} text-[12px] font-interbold `}>{firstname}</Text>
                </TouchableOpacity>
                <TouchableOpacity className={`${value === "bvn" ? "bg-mycolor" : "bg-transparent"} w-[50%] h-full rounded-2xl flex flex-row items-center justify-center`} onPress={() => useValue("bvn")}>
                    <Text className={`${value === "bvn" ? "text-white" : "text-black dark:text-white"} text-[12px] font-interbold`}>{secondname}</Text>
                </TouchableOpacity>
            </View>
        </>
    )

}