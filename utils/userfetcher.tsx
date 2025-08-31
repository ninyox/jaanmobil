import AsyncStorage from "@react-native-async-storage/async-storage";
interface User {
  username: string;
  email: string;
  refercode: string;
}
class UserFetcher {
  private static userData: User | null = null;
  static async fetch(): Promise<void> {
    try {
      const jsonValue = await AsyncStorage.getItem("@user");
      if (jsonValue) {
        UserFetcher.userData = JSON.parse(jsonValue) as User;
      } else {
        UserFetcher.userData = null;
      }
    } catch (error) {
      console.error(error);
    }
  }
  static get username():string | null {
    return UserFetcher.userData?.username ?? null
  }
  static get refercode():string | null {
    return UserFetcher.userData?.refercode ?? null
  }
}

UserFetcher.fetch()

export default UserFetcher