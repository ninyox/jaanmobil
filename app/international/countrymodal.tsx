import { View, Text, TouchableOpacity, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import Custommodal from "../../components/custommodal/page";
import { FontAwesome6, SimpleLineIcons } from "@expo/vector-icons";
interface countryProps {
  name:string,
  emoji:string,
  code:string
}
export default function CountryModal({
  visible,
  submit,
  close,
  data = [],
}: {
  visible: boolean;
  submit: (e: any) => void;
  close: () => void;
  data: countryProps[];
}) {
  const [isSearch, setIsSearch] = useState(false)
  const [searchquery, setSearchquery] = useState('')
  return (
    <>
      <Custommodal visible={visible} close={close}>
        <View className="w-full h-auto">
            <Text className="mx-4 text-xl font-interbold mb-6">
              Select Country
            </Text>
          <View className="h-12 flex flex-row items-center mx-4  border-[0.2px] border-gray-400 mt-2 rounded-lg">
            <SimpleLineIcons
              name="magnifier"
              color="gray"
              size={13}
              style={{ marginHorizontal: 9 }}
              onPress={() => setIsSearch((prev) => !prev)}
            />
            <TextInput
              className="w-full text-black text-twelve font-inter dark:text-white"
              style={{
                height: 40,
                paddingHorizontal: 10,
                marginHorizontal: 5,
                borderRadius: 10,
              }}
              placeholder="search "
              onChangeText={(text) => setSearchquery(text)}
              value={searchquery}
            />
          </View>
      
          {data.filter(item => item.name.includes(searchquery))?.map((item: countryProps, index: number) => (
            <TouchableOpacity
              key={index}
              className="w-full h-14 rounded-md border-t-[0.2px] flex flex-row items-center px-2 my-1 border-slate-300"
              onPress={() => submit(item)}
            >
              <Text className="font-intermedium text-3xl mx-2  dark:text-white">
               {item.emoji}
              </Text>
              <Text className="font-intermedium text-twelve mx-2  dark:text-white">
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Custommodal>
    </>
  );
}
