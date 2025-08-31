"use client";
import { Image, Appearance, useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const [autotheme, setAutotheme] = useState(null);
  const resolvedTheme = useColorScheme();
  
  const getTheme = async () => {
    const checkTheme = await AsyncStorage.getItem("autotheme");
    if (checkTheme) {
      setAutotheme(checkTheme);
    }
  };
  useEffect(() => {
    setMounted(true);
    getTheme();
  }, []);

  const setLight = async() => {
    await AsyncStorage.setItem("autotheme","light")
    Appearance.setColorScheme("light")
  }
  const setDark = async() => {
    await AsyncStorage.setItem("autotheme","dark")
    Appearance.setColorScheme("dark")
  }

  if (!mounted)
    return (
      <Image
        source="data:image/svg+xml;base64,PHN2ZyBzdHJva2U9IiNGRkZGRkYiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMCIgdmlld0JveD0iMCAwIDI0IDI0IiBoZWlnaHQ9IjIwMHB4IiB3aWR0aD0iMjAwcHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiB4PSIyIiB5PSIyIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSIyIj48L3JlY3Q+PC9zdmc+Cg=="
        width={36}
        height={36}
        sizes="36x36"
        alt="Loading Light/Dark Toggle"
        priority={false}
        title="Loading Light/Dark Toggle"
      />
    );
 if(!autotheme ){
  if (resolvedTheme === "dark") {
    return (
      <>
        <Feather
          name="sun"
          onPress={() => setLight()}
          className="mx-3 dark:hidden flex"
        />
        <Feather
          name="sun"
          onPress={() => setLight()}
          className="mx-3 dark:flex hidden"
          color="white"
        />
      </>
    );
  }

  if (resolvedTheme === "light") {
    return (
      <>
        <Feather
          name="moon"
          onPress={() => setDark()}
          className="mx-3 dark:hidden flex"
        />
        <Feather
          name="moon"
          onPress={() => setDark()}
          className="mx-3 dark:flex hidden"
          color="white"
        />
      </>
    );
  }
 }
 else{
  if (autotheme === "dark") {
    return (
      <>
        <Feather
          name="sun"
          size={18}
          onPress={() => setLight()}
          className="mx-3 dark:hidden flex"
        />
        <Feather
          name="sun"
          size={18}
          onPress={() => setLight()}
          className="mx-3 dark:flex hidden"
          color="white"
        />
      </>
    );
  }

  if (autotheme === "light") {
    return (
      <>
        <Feather
          name="moon"
          size={18}
          onPress={() => setDark()}
          className="mx-3 dark:hidden flex"
        />
        <Feather
          name="moon"
          size={18}
          onPress={() => setDark()}
          className="mx-3 dark:flex hidden"
          color="white"
        />
      </>
    );
  }
 }

}
