import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export const BackButton = () => {
  return (
    <>
      <AntDesign
        name="left"
        size={18}
        className="fill-black dark:hidden flex"
        color="black"
        onPress={() => router.back()}
      />
      <AntDesign
        name="left"
        size={18}
        color="white"
        className="fill-black hidden dark:flex"
        onPress={() => router.back()}
      />
    </>
  );
};

export const FrontButton = () => {
  return (
    <>
      <AntDesign
        name="right"
        size={18}
        className="fill-black dark:hidden flex"
        color="black"

      />
      <AntDesign
        name="right"
        size={18}
        color="white"
        className="fill-black hidden dark:flex"

      />
    </>
  );
};

export const CaretIcon = () => {
  return (
    <>
      <MaterialIcons
        name="keyboard-arrow-down"
        size={14}
        className="fill-black dark:hidden flex"
        color="black"
        onPress={() => router.back()}
      />
      <MaterialIcons
        name="keyboard-arrow-down"
        size={14}
        color="white"
        className="fill-black hidden dark:flex"
        onPress={() => router.back()}
      />
    </>
  );
};
