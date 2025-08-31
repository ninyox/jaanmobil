import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";
interface Items {
    id: number, name: string, value: string
}
interface ConfirmInterface {
    visible: boolean;
    submit: () => void;
    close: () => void;
    data: Items[];
}
import Custommodal from "../../components/custommodal/page";
export default function Confirmmodal({ visible, submit, close, data }: ConfirmInterface) {
    return (
        <>
            <Custommodal visible={visible} close={close}>
                <View className="w-full h-auto px-2">
                    <Text className="text-sixt font-interbold mb-7 ml-3 dark:text-white">Confirm Transaction</Text>
                    {data?.map((items) => (
                        <TouchableOpacity key={items.id} className="w-full h-11 rounded-md justify-between flex flex-row items-center px-1 my-1 dark:border-slate-300">
                            <Text className="font-intermedium text-twelve mx-2  dark:text-white text-setgray">{items.name}</Text>
                            <Text className="font-interbold text-twelve mx-2  dark:text-white text-setgray">{items.value}</Text>
                        </TouchableOpacity>
                    ))}
                    <View className="w-full h-auto flex flex-row items-center justify-center mt-10">
                        <TouchableOpacity className="w-10/12 bg-mycolor h-14 items-center justify-center rounded-2xl" onPress={() => submit()}>
                            <Text className="text-white font-interbold text-md">Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Custommodal>
        </>
    );
}

