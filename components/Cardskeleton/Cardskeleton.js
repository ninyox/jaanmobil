import React from "react";
import { View ,Text} from "react-native";
const Cardskeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((item,indexe) => (
        <View key={indexe} className="h-auto gap-0 flex flex-col pb-2 my-1 border-slate-300 rounded-md relative cursor-pointer w-half justify-between">
          <View className="h-[200px] w-full flex flex-col justify-between">
            <View className="skeleton-loading h-[150px] w-full rounded-lg" ></View>
            <View className="skeleton-loading h-[10px] w-full rounded-lg" ></View>
            <View className="skeleton-loading h-[10px] w-full rounded-lg" />
            <View className="skeleton-loading h-[10px] w-full rounded-lg" />
          </View>
        </View>
    ));
};

export default Cardskeleton;
