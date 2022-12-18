import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Icon } from 'react-native-elements'


function Recent({navigation}) {
  return (
    <View style={styles.container}>
        <View style={{ alignItems: "flex-start" }}>
         <Pressable onPress={() => navigation.navigate("menu")}>
            <Icon  name='arrow-left' color = "white" size={50} type='material'/>
         </Pressable>
        </View>
      <View style={styles.banner}>
        <Text style={styles.ttext}>Recents {' '}
        <Icon name='schedule' color = "white" size={30} type='material'/>
        {'\n\n'}</Text>
      </View>
      <View style={styles.banner}>
      <Pressable
          style={styles.btn}
          
          onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "black", letterSpacing: 0.2,fontSize: 20 }}>Lamp 
          </Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "black", letterSpacing: 0.2, fontSize: 20 }}>Pillow Case 
          
          </Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
        <Pressable
          style={styles.btn}
          onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "black", letterSpacing: 0.2, fontSize: 20 }}>Door
          </Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
        </View>
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
    iconn: {
        alignItems: "start",
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
      backgroundColor:"white",
      width: "70%",
      alignItems: "center",
      paddingTop: "2%",
      paddingBottom: "2%",
      borderRadius: 2,
      marginBottom: "5%",
      flexDirection: "column",
      alignItems: "center",
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
export default Recent