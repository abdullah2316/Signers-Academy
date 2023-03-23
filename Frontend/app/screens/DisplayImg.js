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
import axios from "axios";
function DisplayImg({ route, navigation }) {
  const { imgURI } = route.params.path;

  const sendImage = async function () {
    console.log(route.params.path);
    const formData = new FormData();
    formData.append("image", {
      uri: route.params.path,
      type: "image/jpeg",
      name: "image.jpg",
    });
    try {
      const response = await axios.post(
        "http://192.168.1.7:5001/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // const response = await axios.post(
      //   "http://192.168.1.7:5001/predict",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: route.params.path }} style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={sendImage}>
            <Icon
              style={styles.icon}
              name='done'
              color='white'
              size={60}
              type='material'
            />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate("capture");
            }}>
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
    paddingBottom: "10%",
  },
  button: {
    backgroundColor: "#24a0ed",
    borderColor: "#24a0ed",
    borderWidth: 2,
    borderRadius: 40,
    padding: 10,
  },
});
export default DisplayImg;
