import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window')
export const styles = StyleSheet.create({
    images: {
        width: width * 0.5,
        height: 200
    },
    firstbox: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
    },
    bigtext: {
        fontWeight: '800',
        fontSize: 24,
        fontFamily: 'inter',
        marginBottom: 15,
    },
    smalltext: {
        width: width * 0.9,
        fontSize: 17,
        fontWeight:'500',
        textAlign: 'center',
        fontFamily: 'inter',
    },
    button: {
        width: width * 0.8,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    buttono: {
        width: width * 0.8,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    pleasewait: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'inter-Medium',
        color: 'white',
        fontWeight: '500'
    },
    notnow: {
        fontSize: 15,
    },
    boxcenter: {
        width: width * 0.7,
        height: 'auto',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 2,
        borderRadius: 15,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily:'inter'
    },
    closebutton: {
        width: "auto",
        height: 'auto',
        padding: 5,
        backgroundColor: '#753ff6',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    downbox: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        marginTop:20,
    },
})
