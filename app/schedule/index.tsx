import React, { useState } from "react";
import {
  Text,
  View,
} from "react-native";
import Customview from "../../components/customview";
import Footer from "@/components/footer/page";
import ScheduleProp from "./prop";
import AirtimeProp from "./airtimeprop";
import BillsProp from "./billsprop";
export default function Schedule() {
  const [scheduleValue, setScheduleValue] = useState("airtime");
  return (
    <>
      <Customview>
        <View className="items-center px-4 min-h-full w-full h-auto flex-grow">
          <View className="w-full h-28 boder-b-[0.2px]">
            
            <Text className="text-lg font-intermedium text-center text-gray-900 mb-6 mt-2 dark:text-white">
              Schedule
            </Text>
            <ScheduleProp
              firstname="Airtime"
              secondname="Bills"
              value={scheduleValue}
              useValue={(value: string) => setScheduleValue(value)}
            />
          </View>
          {
            scheduleValue === "airtime" ? (
              <AirtimeProp />
            ) : (
              <BillsProp />
            )
          }
        </View>


      </Customview>
      <Footer selected="schedule" />
    </>
  );
}
