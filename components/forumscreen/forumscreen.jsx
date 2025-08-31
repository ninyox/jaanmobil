import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  Vibration,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ImageBackground
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
const deal = require('@/assets/images/chatbg.jpeg')

import { useEffect, useRef, useState } from "react";
import { timeAgo } from "../worker/page";
import { SaveImages } from "./log.js";
import Imagebox from "@/components/imagebox/page.js";
import Loader from "../loader/loader";
import Chatoption from "@/modals/forumoption/page.js";
import useAuth from "@/store/authstore.jsx";
import * as ImagePicker from "expo-image-picker"
export default function ForumScreen({ submit, receivedData, optiondelete }) {
  const { authId } = useAuth();
  const userd = authId;
  const fileInput = useRef(null);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(false);
  const [imageurl, setImageurl] = useState([]);
  const [openImage, setOpenimage] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imageprop, setImageProp] = useState([]);
  const [option, setOption] = useState(false);
  const [report, setReport] = useState(false);
  const [x, setX] = useState(53);
  const [y, setY] = useState(9);
  const [optionprop, setOptionprop] = useState(null);
  const textref = useRef(null);
  const handleUpload = async () => {
    setLoader(true);
    try {
      const response = await SaveImages(images);
      const load = {
        text: "",
        imageurl: response,
        type: "image",
      };
      submit(load);
      setSelected(false);
    } catch (error) {
      alert("Error uploading Image");
    } finally {
      setLoader(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (text === "" && selected === false) {
        return;
      }
      if (selected) {
        handleUpload();
      }
      if (text !== "") {
        const load = {
          imageurl: "",
          text: text,
          type: "message",
        };
        submit(load);
        setText("");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = textref.current;
      if (element) {
        element.scrollToEnd({ animated: true });
      } else {
      }
    };
    handleScroll();
  }, [receivedData, submit]);

  const handleFileChange = async (e) => {
    if (!e) {
      return;
    }
    const selectedFile = Array.from(e);
    console.log(e)
    setImages(selectedFile[0]);
   // const url = selectedFile.map((file) => URL.createObjectURL(file));
    setImageurl([...imageurl,e]);
    setSelected(value => !value);
  };

  const pickImage = async () =>{
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (permissionResult.granted === false){
      Alert.alert("Permission to access camera roll is required")
      return
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing:true,
      quality:1
    })
    if(!result.canceled){
      const selectedImageUri = result.assets[0].uri;
      const selectedImage = JSON.stringify(result.assets[0])
      setImages([selectedImage])
      console.log(selectedImage)
      const fileType = selectedImageUri.substring(selectedImageUri.lastIndexOf('.') + 1).toLowerCase()
      if(fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg'){
        handleFileChange(selectedImageUri)
      }
      else{
        Alert.alert('Invalid File Type', "Please select a PNG or JPEG image")
      }
    }
  }
  const removeImage = (prop) => {
    const newImages = imageurl.filter((item) => item !== prop);
    setImageurl(newImages);
  };

  useEffect(() => {
    if (selected && imageurl.length < 1) {
      setSelected(false);
    }
  }, [imageurl]);
  const OpenImage = (prop) => {
    const propArray = [prop];
    setImageProp(propArray);
    setOpenimage(true);
  };
  const handleLong = (e, messager) => {
    Vibration.vibrate();
    const { pageX, pageY } = e.nativeEvent;
    setX(pageX);
    setY(pageY);
    setOptionprop(messager);
    setOption(true);
  };

  return (
    <>
      <View className="w-full bg-white h-auto flex-grow flex flex-col justify-between lol:bg-gray-900 relative scrollbar-hide">
        <ImageBackground imageStyle={{opacity:0.3,resizeMode:"repeat",height:"100%"}} source={deal} className="viewport flex flex-1 flex-col w-full scrollbar-hide bg-chatbg bg-contain">
          <ScrollView ref={textref} className=" flex-grow  overflow-x-auto ">
            <View className="w-full px-3 py-1 h-auto">
              <View className="flex w-auto h-auto border-[0.2px] p-1 justify-center bg-yellow-100 items-center rounded-full flex-row">
                <Entypo
                  name="warning"
                  size={20}
                  color="#e0123f"
                  className="fill-yellow-600 mx-2"
                />
                <Text className="text-[13px] font-inter text-yellow-700">
                  Never send money to anyone
                </Text>
              </View>
            </View>
            {receivedData?.map((item, index) => {
              return (
                <View
                  key={index}
                  className={`msgbox flex flex-row items-center w-full h-auto px-2 py-2  cursor-pointer ${
                    item.sender === userd ? "justify-end" : "justify-start"
                  }`}
                >
                  <View
                    className={`min-w-20 w-3/5 lg:w-2/5 h-auto flex justify-end ${
                      item.sender === userd ? "flex-row" : "flex-row-reverse"
                    } `}
                  >
                    <View className="min-w-20 w-4/5 h-auto block">
                      <View
                        className={`flex justify-end min-h-4 h-auto w-full ${
                          item.sender === userd
                            ? "flex-row"
                            : "flex-row-reverse"
                        }`}
                      >
                        <Text className="text-sm font-intermedium text-blue-600">
                          {item.sendername}
                        </Text>
                        <Text className="">&nbsp;~&nbsp;</Text>
                      </View>
                      <TouchableOpacity
                        onLongPress={(e) => handleLong(e, item)}
                        className={`${
                          item.sender === userd
                            ? "bg-mycolor rounded-tr-none"
                            : "bg-slate-500 rounded-tl-none"
                        } min-w-20 rounded-[12px] w-auto h-auto min-h-10 px-3 py-3 mb-2`}
                      >
                        {item.type === "message" ? (
                          <Text className="text-white font-intermedium  text-sm whitespace-pre-wrap">
                            {item.message}
                          </Text>
                        ) : (
                          <Image
                            source={{uri:item.imageurl || "https://korakote.com/emoticon.png"}}
                            className="rounded-md my-2"
                            onPress={() => OpenImage(item.imageurl)}
                          />
                        )}
                      </TouchableOpacity>
                      <View className="flex justify-end min-h-3 h-auto w-full">
                        <Text className="text-[11px] text-black">
                          {timeAgo(item.date)}
                        </Text>
                      </View>
                    </View>
                    <View className="w-8 h-8 rounded-full mx-2 mt-4">
                      <Image
                        source={{uri:item.senderimage || "https://korakota.com/emoticon.png"}}
                        className="rounded-full w-full h-full"
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </ImageBackground>

        <View className="justify-center flex-col flex w-full lol:bg-gray-900 bg-whte h-auto left-0">
          {selected && (
            <View className="flex overflow-y-hidden flex-nowrap h-32 px-1 w-full flex-row rounded-md overflow-x-auto whitespace-nowrap py-3 justify-end">
              {imageurl.map((items, index) => {
                return (
                  <View
                    key={index}
                    className="h-full w-28 block relative flex-shrink-0 mr-2 scroll-m-0"
                  >
                    <View className="absolute top-0 left-0 bg-opacity-10 bg-fakecolor w-full h-5 justify-end px-2 flex z-30">
                      <MaterialIcons
                        name="cancel"
                        size={20}
                        className="fill-black"
                        color='red'
                        onPress={() => removeImage(items)}
                      />
                    </View>
                    <Image
                      onPress={() => OpenImage(items)}
                      source={{uri:items}}
                      className="w-full h-full object-covr rounded-md"
                    />
                  </View>
                );
              })}
            </View>
          )}
           <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? "padding" : "height"}
            className="flex w-full border-slate-300 border-t h-20 items-center justify-around px-2 bg-whte lol:bg-gray-900 lol:border-gray-500 flex-row"
          >

           <View className="flex items-center py-1 mx-2  pl-3 flex-grow justify-between borer-[0.5px] lol:bg-gray-900  lol:border-gray-500 flex-row bg-slate-100 rounded-full">
              <TextInput
                value={text}
                className="w-9/12 h-auto min-h-4 bg-transparent text-sm font-inter outline-none items-center flex flex-col lol:bg-gray-900 lol:border-none"
                onChangeText={(e) => setText(e)}
                aria-multiline
                placeholder="Input message to send"
              />
              <TouchableOpacity className="w-auto h-auto bg-slate-200 lol:bg-slate-700 p-2 rounded-[40px] mx-2">
                <Feather
                  name="paperclip"
                  size={22}
                  className="bg-transparent"
                  onPress={() => pickImage()}
                />
              </TouchableOpacity>
            </View>

            <View className="w-auto h-auto bg-slate-200 p-2 rounded-[40px] mx-2 lol:bg-slate-700">
              <Ionicons
                name="paper-plane-outline"
                size={20}
                type="submit"
                onPress={handleSubmit}
              />
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
      {openImage && (
        <Imagebox image={imageprop} cancel={(e) => setOpenimage(!e)} />
      )}
      {loader && <Loader />}
      {option && (
        <Chatoption
          close={() => setOption(false)}
          xpos={x}
          ypos={y}
          messageid={optionprop === null ? {} : optionprop}
          deletemsg={(ide) => optiondelete(ide)}
        />
      )}
    </>
  );
}
