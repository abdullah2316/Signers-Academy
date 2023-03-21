import React from "react";
import { Icon } from "react-native-elements";
import {
  Button,
  StyleSheet,
  Text,
  button,
  View,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
function DisplayImg({ route, navigation }) {
  const { imgURI } = route.params;
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: route.params.path }} style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => {navigation.navigate("player", {path:require('../assets/Door.mp4'),name: "Door", urdu: "دروازہ" })}}>
            <Icon
              style={styles.icon}
              name='done'
              color='white'
              size={60}
              type='material'
            />
          </Pressable>
          <Pressable style={styles.button} onPress={() => {navigation.navigate("capture")}}>
            <Icon
              style={styles.icon}
              name='replay'
              color='white'
              size={60}
              type='material'
            />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom:"10%",
    
  },
  button: {
   
    backgroundColor:"#24a0ed",
    borderColor:"#24a0ed",
    borderWidth:2,
    borderRadius:40,
    padding:10
  },
});
export default DisplayImg;
