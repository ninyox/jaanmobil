import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    Vibration,
    ImageBackground,
    FlatList
  } from "react-native";
  import { useEffect, useRef, useState } from "react";
  import Reportoption from "../option/page";
  import { timeAgo } from "../worker/page";
  import { SaveImages } from "./log.js";
  import Imagebox from "@/components/imagebox/page.js";
  import Loader from "../loader/loader";
  import Chatoption from "@/modals/chatoption/page.js";
  import { MsgDisplay, Warning } from "./prop.js";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
  const deal = require('@/assets/images/chatbg.jpeg')
  
  export default function ChatScreen({ submit, receivedData, optiondelete }) {
    const [text, setText] = useState(""); 
    const fileInput = useRef(null);
    const textref = useRef();
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState(false);
    const [imageurl, setImageurl] = useState([]);
    const [openImage, setOpenimage] = useState(false);
    const [loader, setLoader] = useState(false);
    const [userd, setUserd] = useState(false);
    const [imageprop, setImageProp] = useState([]);
    const [option, setOption] = useState(false);
    const [report, setReport] = useState(false);
    const [x, setX] = useState(53);
    const [y, setY] = useState(9);
    const [optionprop, setOptionprop] = useState(null);
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
            text: text,
            type: "message",
            imageurl: "",
          };
          submit(load);
          setText("");
        }
      } catch (error) {}
    };
  
    useEffect(() => {
      const fetch = async () => {
        const userd = await AsyncStorage.getItem("userid");
        setUserd(userd);
      };
      fetch();
    }, []);
  
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
      if (!e.target.files) {
        return;
      }
      const selectedFile = Array.from(e.target.files);
      setImages(selectedFile[0]);
      console.log(selectedFile[0]);
      if (e.target.files.length < 1) {
        alert("Its typically recommended to upload more than a picture");
      }
      const url = selectedFile.map((file) => URL.createObjectURL(file));
      setImageurl(url);
      setSelected(true);
    };
    const removeImage = (prop) => {
      const newImages = imageurl.filter((item) => item !== prop);
      setImageurl(newImages);
    };
    const handleDiv = () => {
      fileInput.current?.click();
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
      Vibration.vibrate({
        
      })
      const {pageX,pageY} = e.nativeEvent;
      setX(pageX);
      setY(pageY);
      setOptionprop(messager);
      setOption(true);
    };
  
    return (
      <>
        <View className="w-full bg-white h-auto flex-grow flex flex-col justify-between lol:bg-gray-900 relative scrollbar-hide">
          
            <ImageBackground imageStyle={{opacity:0.3,resizeMode:"repeat",height:"100%"}} source={deal} className="flex flex-col w-full flex-1 bg-[url('/chatbg.jpeg')] bg-cover">
            <FlatList ref={textref} className=" flex-grow  overflow-x-auto ">
              <View className="w-full px-3 py-1 h-auto ">
                <Warning />
              </View>
              {receivedData?.map((item, index) => (
                <View
                  key={index}
                  className={`msgbox flex items-center whitespace-normal w-full h-auto px-2 py-2 flex-row ${
                    item.sender === userd ? "justify-end" : "justify-start"
                  }`}
                >
                  <View className="min-w-20 w-3/5 md:w-2/5 h-auto block">
                    <TouchableOpacity
                      onLongPress={(e) => handleLong(e, item)}
                      className={`${
                        item.sender === userd
                          ? "bg-mycolor rounded-tr-none"
                          : "bg-slate-500 rounded-tl-none"
                      } min-w-20 rounded-[10px] w-auto h-auto min-h-10 px-3 py-3 my-2`}
                    >
                      <MsgDisplay item={item} click={(e) => OpenImage(e)} />
                    </TouchableOpacity>
  
                    <View className="flex justify-end min-h-4 h-auto w-full items-center flex-row">
                      <Text className="text-[12px] text-black lol:text-gray-100">
                        {timeAgo(item.date)}
                      </Text>
                      <Ionicons
                        name="checkmark-done"
                        size={12}
                        color={`${
                          item.status === "sent" ? "" : "green"
                        }`}
                        className={`${item.sender !== userd ? "hidden" : ""} ${
                          item.status === "sent" ? "" : " text-green-600 "
                        } mx-3 fill-current`}
                      />
                    </View>
                  </View>
                </View>
              ))}
  
              
              </FlatList>
            </ImageBackground>
          
          <View className="justify-center flex-col flex  w-full lol:bg-gray-900 bg-transparent h-auto left-0">
            {selected && (
              <View className="flex overflow-y-hidden flex-nowrap h-28 px-1 w-full rounded-md overflow-x-auto whitespace-nowrap py-3 justify-end">
                {imageurl.map((items, index) => {
                  return (
                    <View
                      key={index}
                      className="h-full w-24 block relative flex-shrink-0 mr-2 scroll-m-0"
                    >
                      {" "}
                      {/* Removed inline-block */}
                      <View className="absolute top-0 left-0 bg-opacity-10 bg-mycolor w-full h-5 justify-end px-2 flex">
                        <MaterialIcons
                          name="cancel"
                          size={20}
                          className="fill-black"
                          onClick={() => removeImage(items)}
                        />
                      </View>
                      <Image
                        onPress={() => OpenImage(items)}
                        source={{ uri: items }}
                        className="w-full h-full object-cover rounded-md"
                      />{" "}
                      {/* Added object-cover */}
                    </View>
                  );
                })}
              </View>
            )}
            
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? "padding" : "height"}
              className="flex w-full border-slate-300 bordr-t h-16 items-center justify-around px-2 bg-wite lol:bg-gray-900 lol:border-gray-500 flex-row"
            >
              <View className="flex items-center bg-slate-100 rounded-full py-1  px-1 flex-grow justify-between borer-[0.5px] lol:bg-gray-900  lol:border-gray-500 flex-row">
                <TextInput
                  value={text}
                  className="w-9/12 h-auto min-h-6 bg-transparent text-sm font-inter outline-none items-center justify-center ml-2 flex flex-col lol:bg-gray-900"
                  onChangeText={(e) => setText(e)}
                  placeholder="Type message"
                />
                <Feather
                  name="paperclip"
                  size={22}
                  className=" mx-2 lol:fill-gray-300 bg-transparent"
                  onClick={() => handleDiv()}
                />
              </View>
  
              <View className="w-auto h-auto border-[0.2px] p-2 rounded-[40px] mx-2 bg-slate-200 lol:bg-slate-700">
                <Ionicons
                  name="paper-plane-outline"
                  size={18}
                  type="submit"
                  onPress={handleSubmit}
                />
              </View>
            </KeyboardAvoidingView>
          </View>
  
        </View>
  
  
        {option && (
            <Chatoption
              close={() => setOption(false)}
              xpos={x}
              ypos={y}
              messageid={optionprop === null ? {} : optionprop}
              deletemsg={(ide) => optiondelete(ide)}
            />
          )}
        {openImage && (
          <Imagebox image={imageprop} cancel={(e) => setOpenimage(!e)} />
        )}
        {loader && <Loader />}
        {report && <Reportoption />}
      </>
    );
  }
  