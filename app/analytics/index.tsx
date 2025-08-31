import { View, Text, TouchableOpacity, Pressable, Dimensions } from "react-native";
import Customview from "../../components/customview/index";
import { BackButton, CaretIcon } from "@/components/icons/icons";
import { useState } from "react";
import Monthmodal from "./monthmodal";
import { LineChart } from "react-native-chart-kit";
import History from "./history";
import { useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { BaseUrl } from "@/constants";
import Loader from "@/components/loader/loader";
export default function Analytics() {
  const [monthmodal, setMonthmodal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState({
    name: "January",
    value: 1,
  });
  const { data: tranlist, isLoading, error,refetch } = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const token = await AsyncStorage.getItem("token")
      if (!token) {
        router.push("../login/login");
      }
      const response = await BaseUrl.get(
        `/api/v1/user/transactions`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      if (response.data.success) {
        const data = response.data.data;
        let reversedArray = data.reverse();
        return reversedArray
      }
    },

  })
  if (isLoading) {
    return <Loader isLoading={true} />
  }
  if(error){
    return <Text ></Text>
  }
  return (
    <>
      <Customview>
        <View className="w-screen flex h-auto min-h-screen lol:bg-gray-900 flex-col items-center bg-[url('/background.png')] bg-cover lol:bg-[url('/darkbg.png')]">
          <View className="w-screen flex flex-col items-center min-h-full h-auto px-1 pb-3 lol:text-gray-100 lol:bg-gray-950">
            <View className="w-full h-auto py-2 flex justify-between items-center px-2 flex-row">
              <View className="flex items-center flex-row">
                <BackButton />
              </View>
              <Text className="text-sixt font-intermedium dark:text-white">
                Analytics
              </Text>
              <TouchableOpacity className="w-10 h-auto"></TouchableOpacity>
            </View>

            <View className="w-full h-auto rounded-md dark:bg-black my-3 pr-3">
              <TouchableOpacity
                onPress={() => setMonthmodal(true)}
                className="w-auto h-14 px-3 border-[0.2px] border-gray-300 rounded-md flex flex-row items-center "
              >
                <Text className="font-intermedium text-sm dark:text-white">
                  {selectedMonth.name}
                </Text>
                <CaretIcon />
              </TouchableOpacity>
              
              <View className="w-full flex flex-row items-center justify-center border-[0.3px] border-slate-500 rounded-lg p-1">
                <LineChart
                    data={{
                      labels: ["1","10", "15", "20", "25", "30"],
                      datasets: [
                        {
                          data: [
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 1000,
                            Math.random() * 100,
                            Math.random() * 100,
                            Math.random() * 100
                          ]
                        }
                      ]
                    }}
                    width={Dimensions.get("window").width * 0.90}
                    height={220}
                    yAxisLabel="₦ "
                    yAxisSuffix=""
                    fromZero={true}
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundColor: "#ffffff",
                      backgroundGradientFrom: "#fffff",
                      backgroundGradientTo: "#ffffff",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(107, 52, 255, 1)`,
                      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      style: {
                        borderRadius: 16,
                        
                        
                      },
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#6b34ff",
                        fill:"#ffb509"
                      }
                    }}
                    withShadow={false}
                    withDots={true}
                    withInnerLines={true}
                    bezier
                    style={{
                      marginVertical: 8,
                      borderRadius: 16
                    }}
                  />
              </View>
            </View>
            
          
            <History data={tranlist}/>
          </View>
        </View>
        <Monthmodal
          visible={monthmodal}
          close={() => setMonthmodal(false)}
          submit={(e) => {
            setSelectedMonth(e);
            setMonthmodal(false);
          }}
        />
      </Customview>
    </>
  );
}
