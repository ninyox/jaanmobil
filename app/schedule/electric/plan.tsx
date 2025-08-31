import { View, Text, TouchableOpacity } from "react-native";

import Custommodal from "@/components/custommodal/page";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
export default function Datamodal({
  visible,
  submit,
  close,
}: {
  visible: boolean;
  submit: (e:string) => void;
  close: () => void;
}) {
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <Text className="text-lg font-interbold mx-4 mb-4">Payment Method</Text>
        <View className="w-full h-auto">
          <TouchableOpacity
            className="w-full h-20 rounded-md border-t-[0.2px] border-gray-300 flex flex-row items-center px-3 my-1"
            onPress={() => submit("account")}
          >
          
            <Text className="font-intermedium text-lg mx-4">
              Prepaid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-full h-20 rounded-md border-t-[0.2px] border-gray-300 flex flex-row items-center px-3 my-1"
            onPress={() => submit("card")}
          >
 
            <Text className="font-intermedium text-twelve mx-4">PostPaid</Text>
          </TouchableOpacity>
        </View>
      </Custommodal>
    </>
  );
}

/*
  const [inputs, setInputs] = useState(['', '', '', '']);
    const handleKeyPress = (key) => {
        const updatedInput = [...inputs];
        const emptyinputindex = updatedInput.findIndex((digit) => digit === '')

        if (emptyinputindex !== -1) {
            updatedInput[emptyinputindex] = key;
            setInputs(updatedInput)
            if (emptyinputindex === 3) {
                handleSubmit(key)
            }

        }
    }
    const handleDeletePress = () => {
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
