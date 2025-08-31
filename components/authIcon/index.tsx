import { Alert, Platform, View } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Entypo } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication"
export default function AuthIcon({ success }:{success:Function}) {
    const handleClick = async () => {
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
   
        if (isBiometricAvailable && savedBiometrics) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate With Face Id or Fingerprint",
                fallbackLabel: "Use Passcode instead"
            });
            console.log(result)
            if (result.success) {
                console.log("Authenticated Successfully");
                success()
            }
            else {
                console.log("Authentication failed");
                Alert.alert("Authentication failed!")
            }
        }
        else {
            Alert.alert("Biometric authentication is not available on this device")
        }

    }
    return (
        <View>
            {
                Platform.OS === "ios" ? (
                    <MaterialCommunityIcons name="face-recognition" size={24} color="white" onPress={() => handleClick()} />
                ) : (
                    <Entypo name="fingerprint" size={24} color="white" onPress={() => handleClick()} />
                )
            }
        </View>
    )
} 