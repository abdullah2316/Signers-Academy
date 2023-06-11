import React, { useState, useEffect } from "react";
//import axios from "axios";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../config";
function UpdateWord({ navigation, route }) {
  const [eng, setEng] = useState(route.params.name_eng);
  const [urd, setUrd] = useState(route.params.name_urdu);
  const [url, setUrl] = useState(route.params.video_url);

  let id = route.params.id;
  const HandleUpdate = async () => {
    console.log(typeof id, " id");
    if (!eng.trim() || !urd.trim() || !url.trim()) {
      Alert.alert("Empty field", "All fields are required!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);

      return;
    }
    try {
      console.log(url);
      const response = await axios.post(
        `${API_BASE_URL}/admin/updateword/${id}`,
        {
          name_eng: eng,
          name_urdu: urd,
          video_url: url,
        }
      );

      // console.log(response.data.token);
      // await SecureStore.setItemAsync("token", response.data.token);
      Alert.alert("Word updated", "Word updated", [
        {
          text: "OK",
          onPress: () => {
            setEng("");
            setUrd("");
            setUrl("");
          },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading} textCenter>
        Update Word
      </Text>
      <TextInput
        textColor='black'
        mode='outlined'
        label='English Word'
        value={eng}
        onChangeText={setEng}
        activeOutlineColor='#5DBB63'
        outlineColor='#899499'
        style={styles.textInput}></TextInput>

      <TextInput
        textColor='black'
        mode='outlined'
        label='Urdu Word'
        value={urd}
        onChangeText={setUrd}
        activeOutlineColor='#5DBB63'
        outlineColor='#899499'
        style={styles.textInput}></TextInput>

      <TextInput
        textColor='black'
        mode='outlined'
        label='Video URL'
        value={url}
        onChangeText={setUrl}
        activeOutlineColor='#5DBB63'
        outlineColor='#899499'
        style={styles.textInput}></TextInput>
      <Pressable style={styles.btn} onPress={() => HandleUpdate()}>
        <Text style={{ color: "white", letterSpacing: 0.2 }}>Update Word</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingBottom: "10%",
    paddingTop: "30%",
    paddingLeft: "5%",
    paddingRight: "5%",
    alignItems: "center",
  },
  heading: {
    color: "black",
    letterSpacing: 0.2,
    fontSize: 30,
    fontWeight: "bold",
  },
  ttext: {
    color: "black",
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
    backgroundColor: "white",
    width: "70%",
    marginBottom: "5%",
  },
  btn: {
    backgroundColor: "#5DBB63",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 2,
    marginBottom: "5%",
  },
  btn2: {
    backgroundColor: "#5DBB63",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 2,
    marginBottom: "5%",
  },
});
export default UpdateWord;
