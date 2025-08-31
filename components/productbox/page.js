import { Link, router } from "expo-router";
import { View ,Text,Image, ScrollView, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";

import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Cardskeleton from "@/components/Cardskeleton/Cardskeleton.js";

import { Log } from "./log.js";

export default function Product({ items, load }) {
  const [banner,setBanner] = useState([])

  const fetchAds = async () => {
    try {
      const response = await Log()
      if(response.success){
        //console.log(response.data)
        setBanner(response.data)
      }
    } catch (error) {}
  };

  function addCommas(number) {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
  function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  

  useEffect(() =>{
  fetchAds()
  },[])

  if (!load && items.length < 0) {
    return (
      <>
        <View className="w-screen h-auto flex flex-col items-center justify-center px-5 overflow-y-auto">
          <Entypo name="block" size={200} className="fill-mycolor mt-20" />
          <Text className="text-md font-inter text-center text-slate-600">
            Unfortunately , There's No ads in this section, consider searching
            for a preferred category
          </Text>
        </View>
      </>
    );
  } else {
    const promotedItems = items.filter((item) => item.promoted === "yes");
    const nonPromotedItems = items.filter((item) => item.promoted !== "yes");

    for (let i = promotedItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [promotedItems[i], promotedItems[j]] = [
        promotedItems[j],
        promotedItems[i],
      ];
    }

    const sortedAndPromotedItems = [
      ...promotedItems.slice(0, 2),
      ...nonPromotedItems,
    ];

    if (banner.length > 0) {
      if (sortedAndPromotedItems.length >= 10) {
        sortedAndPromotedItems.splice(10, 0, getRandom(banner)); // Place banner at 10th position
      }
    }
  
    return (
      <>
      <ScrollView>
      <View className="w-full h-auto flex flex-row flex-wrap gap-2 px-3 overflow-y-auto justify-between">
          {load && <Cardskeleton cards={10} />}
          {sortedAndPromotedItems.map((item, index) => {
            ////console.log(item.type);
            return item.type === "advert" ? (
              <TouchableOpacity
                key={item.id}
                className="h-auto gap-0 flex flex-col pb-2 my-1 border border-slate-300 rounded-md relative cursor-pointer w-half justify-between"
                onPress={() => router.push(`ads/${item.advertid}`)}
              >
                <ImageSlider images={item.images} />
                <View className="w-full h-auto flex flex-col p-2">
                  <Text className="font-interbold text-sm md:text-md text-slate-800 lol:text-gray-200">
                    {item.title.length > 19
                      ? item.title.slice(0, 19)
                      : item.title}
                  </Text>
                  <View className="w-full flex items-center flex-row">
                    <EvilIcons name="location" size={13} className="fill-slate-500 " />
                    <Text className="font-inter font-medium text-[13px] text-slate-600 lol:text-slate-200 mx-2 my-1">
                      {item.state}
                    </Text>
                  </View>

                  <View className="flex justify-be mt-2 items-center w-full h-auto flex-row">
                    <Text className="font-intermedium text-slate-800 text-md lol:text-green-500">
                      {item.currency} {addCommas(item.price)}
                    </Text>
                    
                  </View>
                </View>
                <View
                  className={`${
                    item.promoted === "no" ? "hidden" : ""
                  } w-full absolute top-0 left-0 flex justify-start h-auto border-yellow-600 px-1 py-1`}
                >
                  <View className="w-auto h-auto flex bg-blue-5 rounded-sm">
                    <Ionicons name="diamond" className="fill-blue-500"/>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <Link key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="col-View-1 h-[300px] lg:h-[400px] flex border rounded-md">
              <Image source={{uri:item.imageurl}} alt="Banner" className="w-full h-full object-fill rounded-md" />
            </Link>
            );
          })}
        </View>
      </ScrollView>
       
      </>
    );
  }
}

const ImageSlider = ({ images }) => {
  const [indexe, setIndexe] = useState(0);
  const image = JSON.parse(images);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndexe((previndex) => (previndex + 1) % image.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <View className="h-[170px] md:h-[300px]">
      <Image
        width={1000}
        height={1000}
        source={{uri:image[indexe]}}
        alt="product images"
        className="w-full h-full rounded-t-md object-cover"
      />
    </View>
  );
};
/**
 * <View className="w-full h-auto justify-arou grid grid-cols-2 sm:flex sm:flex-wrap md:justify-around gap-2 px-3 mb-6 pb-6 overflow-y-auto lol:bg-gray-900">
 */
