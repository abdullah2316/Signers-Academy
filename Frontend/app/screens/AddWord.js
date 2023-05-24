import React, { useState, useEffect } from "react";
//import axios from "axios";
import { StyleSheet, Text, View, Image, Pressable, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from '../../config';
function AddWord({ navigation }) {
    const [eng, setEng] = useState("");
    const [urd, setUrd] = useState("");
    const [url, setUrl] = useState("");

  
    const HandleAdd = async () => {
      if (!eng.trim() || !urd.trim() || !url.trim()) {
        Alert.alert("Empty field", "All fields are required!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
  
        return;
      }
      try {
        console.log(url);
        const response = await axios.post(`${API_BASE_URL}/admin/addword/`, {
          eng: eng,
          urd: urd,
          url: url,
        });
  
        console.log(response.data.token);
        await SecureStore.setItemAsync("token", response.data.token);
        Alert.alert("Word added", "Word added", [
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
    return(
        <View style={styles.banner}>
            <TextInput
            textColor='white'
            mode='outlined'
            label='English Word'
            value={eng}
            onChangeText={setEng}
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>
            
            <TextInput
            textColor='white'
            mode='outlined'
            label='Urdu Word'
            value={urd}
            onChangeText={setUrd}
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>

            <TextInput
            textColor='white'
            mode='outlined'
            label='Video URL'
            value={url}
            onChangeText={setUrl}
            activeOutlineColor='#FF3131'
            outlineColor='#899499'
            style={styles.textInput}></TextInput>
            <Pressable style={styles.btn} onPress={HandleAdd}>
            {/* onPress={() => navigation.navigate("menu")}> */}
            <Text style={{ color: "white", letterSpacing: 0.2 }}>Add Word</Text>
            </Pressable>
        </View>
    );
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
export default AddWord;