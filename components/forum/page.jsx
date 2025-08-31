import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable
} from "react-native";
import { router } from "expo-router";
const chatlist = [
  {
    id: 1,
    forumid: "Politics",
    name: "Politics",
    lmessage: "Where is your location",
    product: "Apple iPhone X 64 GB White",
    active: "100",
    imagesrc: "https://korakota.com/politi.png",
  },
  {
    id: 2,
    forumid: "Lifestyle",
    name: "Lifestyle",
    lmessage: "Where is your location",
    product: "Apple iPhone X 64 GB White",
    active: "140",
    imagesrc: "https://korakota.com/lifestyle.png",
  },
  {
    id: 3,
    forumid: "Business",
    name: "Business",
    lmessage: "Where is your location",
    product: "Apple iPhone X 64 GB White",
    active: "320",
    imagesrc: "https://korakota.com/Business.png",
  },
  {
    id: 4,
    forumid: "Entertainment",
    name: "Entertainment",
    lmessage: "Where is your location",
    product: "Apple iPhone X 64 GB White",
    active: "320",
    imagesrc: "https://korakota.com/gamepad.png",
  },
  {
    id: 5,
    forumid: "Sport",
    name: "Sport",
    lmessage: "Where is your location",
    product: "Apple iPhone X 64 GB White",
    active: "320",
    imagesrc: "https://korakota.com/sport.png",
  },
];

export default function Forumcomp() {
   
  return (
    <>  
      <View
              className="w-full bordr-2 md:rounded-md bg-white lol:bg-gray-900 h-auto min-h-max scrollbar-hide flex-1">
        {chatlist.map((item) => (
          <Pressable
            key={item.id}
            className="w-full h-16 px-2 items-center flex py-2 justify-between mb-2 hover:bg-mycolor hover:bg-opacity-20 rounded-md cursor-pointer  flex-row"
            onPress={() =>
              router.push(`forum?id=${item.forumid}`)
            }
          >
            <View className="h-12 w-12 bg-slate-100 rounded-md">
              <Image source={{uri:item.imagesrc}} className="w-full h-full rounded-md lol:bg-gray-300 object-contain" />
            </View>
            <View className="flex-grow h-full bg-rd-500 flex-col flex justify-between select-none px-2 mx-3">
              <View className="h-3/6 w-full flex justify-between px-2 items-center flex-row">
                <Text className="font-interbold text-sm text-slate-800 lol:text-gray-200">
                  {item.name}
                </Text>
              </View>
              <View className="h-3/6 w-full flex justify-between px-2 items-end flex-row">
                <Text className="font-inter text-[10px]">
                  active
                </Text>
              </View>
            </View>
            <View className="">
                
            </View>
          </Pressable>
        ))}
      </View>
    </>
  );
}
