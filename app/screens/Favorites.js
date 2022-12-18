import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { Icon } from 'react-native-elements'

function Favorites({navigation}) {
  const [color1, setColor1] = useState("red");
  const [color2, setColor2] = useState("red");
  const [color3, setColor3] = useState("red");
  const [bg1, setBg1] = useState("white");
  const [bg2, setBg2] = useState("white");
  const [bg3, setBg3] = useState("white");
 


  function handlePress1() {
   setColor1("black");
   setBg1("black");
  }
  function handlePress2() {
    setColor2("black");
   setBg2("black");
   }
   function handlePress3() {
    setColor3("black");
   setBg3("black");
   }
  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.ttext}>Favorites {' '}
        <Icon name='favorite' color = "red" size={30} type='material'/>
        {'\n\n'}</Text>
      </View>
      <Pressable
          style={styles.btn}
          backgroundColor = {bg1}
          onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "black", letterSpacing: 0.2,fontSize: 20 }}>Lamp {'\t\t'}
          <Pressable onPress={handlePress1}>
            <Icon style={styles.icon} name='favorite' color = {color1} size={30} type='material'/>
            </Pressable>
          </Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
        <Pressable
          style={styles.btn}
          backgroundColor = {bg2}
          onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "black", letterSpacing: 0.2, fontSize: 20 }}>Pillow Case {'\t\t'}
          <Pressable onPress={handlePress2}>
            <Icon style={styles.icon} name='favorite' color = {color2} size={30} type='material'/>
            </Pressable>
          </Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
        <Pressable
          style={styles.btn}
          backgroundColor = {bg3}
          onPress={() => navigation.navigate("signup")}>
          <Text style={{ color: "black", letterSpacing: 0.2, fontSize: 20 }}>Door {'\t\t'}
          <Pressable onPress={handlePress3}>
            <Icon style={styles.icon} name='favorite' color = {color3} size={30} type='material'/>
            </Pressable>
          </Text>
        </Pressable>
        <Text style={{ color: "black", letterSpacing: 0.2 }}>{'\n'}</Text>
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
export default Favorites