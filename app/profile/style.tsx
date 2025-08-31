import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#ffffff',
        marginBottom:60,
    },
    img: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
        marginLeft: 10,
        borderRadius:50,
    },
    imgcover: {
        width: '100%',
        marginTop: 40,
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    name: {
        marginTop: 30,
        fontSize: 20,
        textAlign: 'center',
        fontWeight: "700",
    },
    acctext:{
     fontSize:15,
     fontWeight:'700',
     color:'darkblue',
     marginLeft:15,
     marginTop:10,
    },
    drawer: {
        width: '100%',
        height: 60,
        marginTop: 10,
        backgroundColor:'#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        borderColor:'black',
        borderBottomWidth:0.2,
    },
    drawerly: {
        width: '100%',
        height: 60,
        marginTop: 10,
        backgroundColor:'#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'center',
        borderColor:'black',
     
    },
    myidea:{
        width: '70%',
        height: 60,
        alignItems:'center',
        backgroundColor:'transparent',
        flexDirection: 'row',
    },
    drawtext:{
        marginLeft:8,
        fontSize: 15,
        color:'black',
        fontWeight:'500',
        fontFamily:'inter',

    }
})