import React, { useState } from 'react';
const wheelimage = require("../../assets/images/newheel.png")
import { View, Text, TouchableOpacity, Animated, Easing, Dimensions, Image } from 'react-native';
const { width } = Dimensions.get('window');
const wheelItems = [
    { id: 1, label: 'Prize 1' },
    { id: 2, label: 'Prize 2' },
    { id: 3, label: 'Prize 3' },
    { id: 4, label: 'Prize 4' },
    { id: 5, label: 'Prize 5' },
    { id: 6, label: 'Prize 6' },
];

const WheelOfFortuneSimplified = () => {
    const [spinAnim] = useState(new Animated.Value(0)); // Animating the spin
    const [result, setResult] = useState(null); // To hold the final result

    const spinWheel = () => {
        const spinDuration = 3000;
        const numberOfRotations = Math.floor(Math.random() * 5) + 5; // Random between 5 and 10 spins
        const landingIndex = Math.floor(Math.random() * wheelItems.length);

        // Calculating total rotation in degrees (e.g., multiple rotations + final landing)
        const totalRotation = numberOfRotations * 360 + (landingIndex * (360 / wheelItems.length));

        // Reset the spin animation value to 0 for repeated spins
        spinAnim.setValue(0);

        // Spin the wheel
        Animated.timing(spinAnim, {
            toValue: totalRotation,
            duration: spinDuration,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() => {
            // Set the result after spinning stops
            setResult(wheelItems[landingIndex].label);
        });
    };

    const interpolatedSpin = spinAnim.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={{ flex: 1, justifyContent: 'centr', alignItems: 'center', width: "100%" }}>
            <TouchableOpacity className="w-auto h-auto px-3 rounded-full bg-indigo-700 py-1" >
                <Text className="text-white font-interbold" >Spins: 3</Text>
            </TouchableOpacity>
            <Animated.View style={{
                width: width * 0.9,
                height: width * 0.9,
                borderColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
                transform: [{ rotate: interpolatedSpin }]
            }}>
                <Image source={wheelimage} className="w-full h-full" />
            </Animated.View>

            <TouchableOpacity
                onPress={spinWheel}
                className="mt-4 w-9/12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Text className="text-white font-interbold">Spin the Wheel</Text>
            </TouchableOpacity>

            {result && (
                <Text style={{ marginTop: 20, fontSize: 24 }}>You won: {result}</Text>
            )}
            <View className="w-11/12 h-auto bg-white rounded-xl mt-10 p-3">
             <Text className="text-center text-blue-900 font-interbold text-md mb-5">How To get more spins ?</Text>
             <TouchableOpacity id='each box' className="w-full h-auto bg-blue-100 rounded-md flex flex-row my-1 py-2">
             <TouchableOpacity className="bg-blue-800 rounded-r-lg" >
             <Text className="p-1 text-white font-intermedium text-sm">1</Text>
             </TouchableOpacity>
             <Text className="p-1 text-slate-800 font-inter text-sm">You get 1 free spin every day.</Text>
            </TouchableOpacity>

            <TouchableOpacity id='each box' className="w-full h-auto bg-blue-100 rounded-md flex flex-row my-1 py-2">
             <TouchableOpacity className="bg-blue-800 rounded-r-lg mr-2" >
             <Text className="p-1 text-white font-intermedium text-sm">2</Text>
             </TouchableOpacity>
             <Text className="p-1 text-slate-800 font-inter text-sm">Complete Any Bill Payment.</Text>
            </TouchableOpacity>

            <TouchableOpacity id='each box' className="w-full h-auto bg-blue-100 rounded-md flex flex-row my-1 py-2">
             <TouchableOpacity className="bg-blue-800 rounded-r-lg mr-2" >
             <Text className="p-1 text-white font-intermedium text-sm">3</Text>
             </TouchableOpacity>
             <Text className="p-1 text-slate-800 font-lexend text-sm">Fund Your Account with more than ₦ 200.</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default WheelOfFortuneSimplified;
0