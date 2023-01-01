import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
function GuestMenu({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Image style={styles.img} source={require("../assets/signers.jpg")} />
      </View>
       <View style={{ alignItems: "center" }}>
        <Text style={styles.ttext}>Signers</Text>
        <Text style={styles.ttext}>Academy {'\n'}{'\n'}</Text>
        
      </View>
      <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("capture")}>
          <Text style={{ color: "black", letterSpacing: 0.2 }}>Capture</Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("dictionary")}>
          <Text style={{ color: "black", letterSpacing: 0.2 }}>Dictionary</Text>
        </Pressable>
       
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
     
      backgroundColor: "black",
      paddingBottom: "10%",
      paddingTop: "15%",
      paddingLeft: "5%",
      paddingRight: "5%",
      alignItems: 'center',
    },
    ttext: {
      color: "white",
      letterSpacing: 0.2,
      fontSize: 30,
      fontWeight: "bold"
    },
    banner: {
      flexDirection: "column",
      alignItems: "center",
    },
    img: {
      width: 300,
      height: 150,
      resizeMode: "stretch",
    },
    textInput: {
      backgroundColor: "black",
      width: "70%",
      marginBottom: "5%",
    },
    btn: {
      backgroundColor: "white",
      width: "70%",
      alignItems: "center",
      paddingTop: "2%",
      paddingBottom: "2%",
      borderRadius: 2,
      marginBottom: "5%",
    },
    btn2: {
    
    backgroundColor: "#B2BEB5",
      width: "70%",
      alignItems: "center",
      paddingTop: "2%",
      paddingBottom: "2%",
      borderRadius: 2,
      marginBottom: "5%",
    },
    
  });
export default GuestMenu