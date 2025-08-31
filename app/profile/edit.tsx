import { Image, Pressable, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import deale from "@/assets/images/emoticon.png";
import { useState } from "react";
import { TextInput } from "react-native";
interface dataProps {
  username: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  birthdate: string | undefined;
  gender: string | undefined;
}
export default function Edit({
  close,
  data: response,
}: {
  close: Function;
  data: dataProps;
}) {
  const [deal, setDeal] = useState(deale);
  const [username, setUsername] = useState<string | undefined>(
    response.username,
  );
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setDeal(result.assets[0].uri);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <>
      <View className="w-full flex flex-col items-center my-5">
        <Image source={deal} className="w-32 h-32 rounded-full" />
        <Pressable>
          <Text
            className="text-mycolor text-sixt font-intermedium mt-3"
            onPress={() => pickImageAsync()}
          >
            Change Image
          </Text>
        </Pressable>
      </View>

      <View className="w-full h-auto rounded-md px-2 dark:bg-dark">
        <View className="w-full h-auto mt-2">
          <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
            User Name
          </Text>
          <TextInput
            value={username}
            placeholder={username}
            onChangeText={(e:string) => setUsername(e)}
            className="font-intermedium text-sm mx-2 text-setgray dark:text-white border-[0.2px] border-gray-400 px-2 h-14 rounded-lg"
          />
        </View>

        <View className="w-full h-auto my-2">
          <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
            Full Name
          </Text>
          <TextInput
            value={response ? response.name : ""}
            placeholder={response ? response.name : ""}
            className="font-intermedium text-sm mx-2 text-setgray dark:text-white border-[0.2px] border-gray-400 px-2 h-14 rounded-lg"
          />
        </View>

        <View className="w-full h-auto my-2">
          <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
            Email Address
          </Text>
          <TextInput
            value={response ? response.email : ""}
            placeholder={response ? response.email : ""}
            className="font-intermedium text-sm mx-2 text-setgray dark:text-white border-[0.2px] border-gray-400 px-2 h-14 rounded-lg"
          />
        </View>

        <View className="w-full h-auto my-2">
          <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
            Phone Number
          </Text>
          <TextInput
            value={response ? response.phone : ""}
            placeholder={response ? response.phone : ""}
            className="font-intermedium text-sm mx-2 text-setgray dark:text-white border-[0.2px] border-gray-400 px-2 h-14 rounded-lg"
          />
        </View>

        <View className="w-full h-auto my-2">
          <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
            Date Of Birth
          </Text>
          <TextInput
            value={cleanDate(response.birthdate)}
            placeholder={cleanDate(response.birthdate)}
            className="font-intermedium text-sm mx-2 text-setgray dark:text-white border-[0.2px] border-gray-400 px-2 h-14 rounded-lg"
          />
        </View>

        <View
          id="Residential"
          className="w-full h-16 flex flex-row justify-start  items-center"
        >
          <View className="w-full h-auto flex-row flex">
            <Pressable className=" flex-grow ml-2">
              <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                Residential Address
              </Text>
              <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white"></Text>
            </Pressable>
          </View>
        </View>

        <View
          id="Gender"
          className="w-full h-16 flex flex-row justify-start  items-center"
        >
          <View className="w-full h-auto flex-row flex">
            <Pressable className=" flex-grow ml-2">
              <Text className="font-intermedium mb-1 text-[12px] text-graytext mx-2 dark:text-white">
                Gender
              </Text>
              <Text className="font-interbold text-sm text-setgray mx-2 dark:text-white">
                {response ? response.gender : "N/A"}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </>
  );
}

function cleanDate(oldDate: string | null | undefined) {
  const newDate = new Date(oldDate);
  return newDate.toString().slice(0, 15);
}
