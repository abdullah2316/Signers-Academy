import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
function Menu() {
  return (
    <View style={styles.container}>
        <Text style={styles.ttext}>Signers</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "black",
      paddingBottom: "10%",
      paddingTop: "15%",
      paddingLeft: "5%",
      paddingRight: "5%",
    },
    ttext: {
      color: "white",
      letterSpacing: 0.2,
    },
    banner: {
      flexDirection: "column",
      alignItems: "center",
    },
    img: {
      width: "70%",
      height: 100,
      resizeMode: "stretch",
    },
    textInput: {
      backgroundColor: "black",
      width: "70%",
      marginBottom: "5%",
    },
    btn: {
      backgroundColor: "#FF3131",
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
export default Menu