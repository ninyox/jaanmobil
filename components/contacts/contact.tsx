import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import * as Contacts from "expo-contacts";
import { FlatList } from "react-native-gesture-handler";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
interface itemProps {
  id: string | undefined;
  name: string | undefined;
  PhoneNumber: string | undefined | null;
}
export const ContactComponent = ({
  Mymodal,
  Closemodal,
  Submit,
}: {
  Mymodal: boolean;
  Closemodal: () => void;
  Submit: (contact: string) => void;
}) => {
  const [contactss, setContacts] = useState<itemProps[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [searchquery, setSearchquery] = useState("");
  const inset = useSafeAreaInsets();
  useEffect(() => {
    handleContact();
  }, []);

  const handleContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    const getstatus = await AsyncStorage.getItem("getstatus");
    if (status !== "granted") {
      if (getstatus !== "done") {
        alert("You need to allow permission to Select contact");
        AsyncStorage.setItem("getstatus", "done");
        return;
      }
    } else {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.FirstName],
      });
      if (data.length > 0) {
        const processedContact = data.map((contact) => ({
          id: contact.id,
          name: contact.name,
          PhoneNumber: contact.phoneNumbers
            ? contact.phoneNumbers[0]?.number
            : "",
        }));

        setContacts(processedContact);
      }
    }
  };

  const handleSearch = async (text: string) => {
    if (text !== "") {
      console.log("this is text", text);
      const filteredItems = contactss.filter(
        (item) => item.name && item.name.includes(text),
      );
      console.log(filteredItems);
      setContacts(filteredItems);
    } else {
      handleContact();
    }
  };
  useEffect(() => {
    handleSearch(searchquery);
  }, [searchquery]);
  const handlePress = (item: string) => {
    Submit(item);
    console.log("this is the item", item);
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
      key={index}
      onPress={() => handlePress(item.PhoneNumber)}
    >
      <Ionicons
        name="person-circle-sharp"
        size={35}
        color="#A49AA7"
        style={{ marginRight: 12 }}
      />
      <View style={{}}>
        <Text
          style={{
            color: "black",
            fontWeight: 700,
            fontFamily: "intermedium",
            fontSize: 14,
          }}
        >{`${item.name} ${index}`}</Text>
        <Text
          style={{
            color: "#333333",
            fontWeight: 500,
            fontFamily: "inter",
            fontSize: 12,
          }}
        >{`${item.PhoneNumber} ${index}`}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={Mymodal}
        onRequestClose={Closemodal}
        style={{ flex: 1, paddingTop: inset.top, paddingBottom: inset.bottom }}
      >
        <View
          style={{
            width: "100%",
            height: 40,
            backgroundColor: "#ffffff",
            flex: 1,
          }}
        >
          <View className="w-full h-16 border-b-[0.2px] border-gray-300 flex flex-row justify-between items-center px-3">
            <FontAwesome6
              name="magnifying-glass"
              color="#ffffff"
              size={18}
              style={{ marginHorizontal: 9 }}
              onPress={() => setIsSearch((prev) => !prev)}
            />
            <Text className="font-intermedium text-sixt dark:text-white text-black">
              Choose Contact
            </Text>

            <Feather
              name="x"
              className="text-white"
              size={25}
              onPress={() => Closemodal()}
            />
          </View>

          <View className="h-12 flex flex-row items-center mx-4  border-[0.2px] border-gray-400 mt-2 rounded-lg">
            <SimpleLineIcons
              name="magnifier"
              color="gray"
              size={18}
              style={{ marginHorizontal: 9 }}
              onPress={() => setIsSearch((prev) => !prev)}
            />
            <TextInput
              className="w-full text-black text-twelve font-intermedium dark:text-white"
              style={{
                height: 40,
                paddingHorizontal: 10,
                marginHorizontal: 5,
                borderRadius: 10,
                fontSize: 18,
              }}
              placeholder="search "
              onChangeText={(text) => setSearchquery(text)}
              value={searchquery}
            />
          </View>

          <FlatList
            data={contactss}
            renderItem={renderItem}
            keyExtractor={(contactss, index) =>
              contactss.PhoneNumber + index.toString()
            }
          />
        </View>
      </Modal>
    </>
  );
};
