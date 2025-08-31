import AsyncStorage from "@react-native-async-storage/async-storage";

 class authStateClass {
    public state!: string;
    constructor(state: string) {
        this.state = state
    }
    async checkState() {
        return await AsyncStorage.getItem("authstate") || this.state
    }

    async setState(state: string) {
        await AsyncStorage.setItem("authstate", state)
    }
}

const AuthState = new authStateClass("none");
export default AuthState;