import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
export default function Customview({ children }: { children: any }) {
  const inset = useSafeAreaInsets();
  return (
    <>
      <View className="dark:bg-dark bg-white" style={{ flex: 1, paddingTop: inset.top,paddingBottom:inset.bottom}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          className="dark:bg-dark"
        >
          {children}
        </ScrollView>
        <StatusBar style="dark" />
      </View>
    </>
  );
}
