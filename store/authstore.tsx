import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
interface dataProp {
  token: string;
  userid: string;
  authValue:boolean
}
const checkAuth = async () => {
  try {

    const token = await AsyncStorage.getItem("token");
   
    return token !== null;
  } catch (error) {
    console.error("Error checking auth token:", error);
    return false;
  }
};


const checkId = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const userid = await AsyncStorage.getItem("userid");
    if (token && userid) {
      return { token, userid };
    }else{
        return false;  
    }
  } catch (error) {
    console.error("Error checking user id:", error);
    return false;
  }
};


const useAuth = create((set, get) => ({
  authToken: null,
  authId: null,
  authValue: false,
  initializeAuth: async () => {
    const auth = await checkAuth();
    const idData:dataProp = await checkId();
    set({
      authToken: idData?.token || null,
      authId: idData?.userid || null,
      authValue: auth,
    });
  },
  toggleAuth: () => set((state:dataProp) => ({ authValue: !state.authValue })),
}));

// Call initializeAuth when the store is created
useAuth.getState().initializeAuth();

export default useAuth;
