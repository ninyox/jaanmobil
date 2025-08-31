"use client";
import useModal from "@/store/modal";
import Loader from "@/components/loader/loader";
//import Supportbox from "@/components/supportbox/page.js";
//import Supportchat from "@/components/supportchat/page.js";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import ThemeSwitch from "../../modals/themeswitch/theme.jsx";
import {
  Entypo,
  Feather,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Pressable, ScrollView,View,Text } from "react-native";
export default function Setmodal() {
  const { showModal, handleOpenModal, handleCloseModal } = new useModal();
  return (
    <>
      <ScrollView>
        <View className="w-full flex flex-col items-center min-h-screen h-auto px-1 pb-3 lol:text-gray-100 relative">
          <Pressable
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300 w-full  items-center py-4 cursor-pointer "
            onPress={() => router.push("myadverts")}
          >
            <View className="flex-grow flex px-2 flex-row ">
              <Entypo name="shop" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-black lol:text-gray-100">
                My Adverts
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3"
            />
          </Pressable>

          <Pressable
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full  items-center py-4 cursor-pointer "
            onPress={() => router.push("/bookmarks")}
          >
            <View className="flex-grow flex px-2 flex-row flex-row">
              <MaterialCommunityIcons
                name="bookmark-check"
                size={20}
                className="mr-4"
              />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Bookmarks
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
            onPress={() => router.push("/invoices")}
          >
            <View className="flex-grow flex px-2 flex-row ">
              <FontAwesome5 name="receipt" size={20} className="mr-2" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                My Invoices
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/withdraw")}
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <MaterialIcons name="money" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Withdraw Funds
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/referral")}
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <Ionicons name="people" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                My Referrals
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => alert("Coming soon!")}
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <MaterialIcons
                name="verified"
                size={20}
                color="blue"
                className="mr-4 fill-blue-600"
              />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Get verified badge
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/changepassword")}
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <Feather name="lock" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Update password
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <View className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer ">
            <View className="flex-grow flex px-2 flex-row ">
              <Ionicons name="chatbubble-ellipses" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Contact Support
              </Text>
            </View>
            <Ionicons name="mail" size={18} className="mr-3 fill-blue-500" />
          </View>

          <View className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer ">
            <View className="flex-grow flex px-2 flex-row ">
              <Feather name="moon" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Light/Dark Mode
              </Text>
            </View>
            <ThemeSwitch />
          </View>

       
          <Pressable
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
            onPress={() => router.push("/privacy")}
          >
            <View className="flex-grow flex px-2 flex-row ">
              <MaterialIcons name="privacy-tip" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Privacy Policy
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/about")}
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <Ionicons name="information-circle" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                About
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/terms")}
            className="flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <Ionicons name="information-circle" size={20} className="mr-4" />
              <Text className="text-sm font-intermedium text-slate-800 lol:text-gray-100">
                Terms of Use
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => {
              localStorage.removeItem("token");
              alert("logged out");
              window.location.href = "/";
              router.refresh();
            }}
            className="md:flex flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4 hidden cursor-pointer "
          >
            <View className="flex-grow flex px-2 flex-row ">
              <Ionicons name="exit" size={20} className="mr-4 fill-red-600" />
              <Text className="text-sm font-intermedium text-red-700">
                Log out
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>

          <Pressable
            onPress={() => router.push("/deactivate")}
            className="flex cursor-pointer flex-row justify-between lol:border-gray-500 border-b-[0.5px] border-slate-300  w-full items-center py-4"
          >
            <View className="flex-grow flex px-2 flex-row ">
              <MaterialIcons name="delete" size={20} color="red" className="mr-4 text-red-600" />
              <Text className="text-sm font-intermedium text-red-700">
                Deactivate Account
              </Text>
            </View>
            <MaterialIcons
              name="arrow-forward-ios"
              size={15}
              className="mr-3 fill-slate-700 lol:fill-gray-200"
            />
          </Pressable>
         
        </View>
      </ScrollView>
      {showModal && <Loader />}
      
    </>
  );
}
/**
 *  <Supportbox click={() => setshow(true)} />
 * {show && <Supportchat close={() => setshow(false)} />}
 */