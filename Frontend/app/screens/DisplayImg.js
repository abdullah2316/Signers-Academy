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
import { API_BASE_URL } from "../../config";
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
        "http://192.168.1.2:5001/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data.class_label);
      const response2 = await axios.get(
        `${API_BASE_URL}/dictionary/getword/${response.data.class_label}`
      );
      console.log(response2.data);
      navigation.navigate("player", {
        path: response2.data.video_url,
        name: response2.data.name_eng,
        urdu: response2.data.name_urdu,
        id: response2.data._id,
      });
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
