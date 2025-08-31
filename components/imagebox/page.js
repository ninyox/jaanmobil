

import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
export default function Imagebox({ image, cancel }) {

  return (
    <>
      <main className="w-screen h-screen fixed inset-0 flex flex-col justify-center bg-black">
        <View className="fixed top-0 w-full h-12 flex justify-end px-3 py-2 z-50">
          <MaterialIcons name="close" size={35} className="fill-white cursor-pointer z-[99999]" onClick={cancel} />
        </View>
        <View className="flex h-full w-full rounded-md  whitespace-nowrap py-3 items-center justify-center flex-col">
        <ScrollView horizontal={true}
        className="h-full px-1 rounded-md w-full py-3 items-center justify-center flex">
          {image.map((item,index) => (
              <>
                <View key={index} className="w-full h-full mr-2 scroll-m-0">
                  <Image src={item} width={1000} height={1000} className="w-full h-full object-contain border border-red-500" alt="Sent image" />
                </View>
              </>
            )
          )}
        </ScrollView>
        </View>
        
      </main>
    </>
  );
}
