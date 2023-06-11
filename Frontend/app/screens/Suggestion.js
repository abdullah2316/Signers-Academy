import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../config";
import { items_list } from "./Dummydata.js";
function Suggestion({ navigation }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getRec() {
      let token = await SecureStore.getItemAsync("token");
      console.log(token, " token");
      const response = await axios.get(`${API_BASE_URL}/recent/get`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data, " response");
      const jsonData = JSON.stringify(response.data);
      console.log(jsonData, " jsondata");

      const response2 = await axios.post(
        "http://192.168.1.12:5001/suggestions",
        jsonData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response2.data.data, "response 2");
      setItems(response2.data.data);
    }
    getRec();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-start" }}>
        <Pressable onPress={() => navigation.navigate("menu")}>
          <Icon
            style={styles.icon}
            name='keyboard-backspace'
            color='#5DBB63'
            size={30}
            type='material'
          />
        </Pressable>
      </View>
      <View style={{ paddingBottom: "10%", flexDirection: "row" }}>
        <Text style={styles.ttext} textCenter>
          Suggestions
        </Text>
        <Icon
          style={{ marginLeft: "5%", marginTop: "12%" }}
          name='history'
          color='black'
          size={30}
          type='material'
        />
      </View>
      <View style={styles.banner}>
        <ScrollView>
          {items &&
            items.map((item, i) => (
              <>
                <View
                  style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <Pressable
                  style={styles.btn}
                  onPress={() => {
                    navigation.navigate("player", {
                      path: item.link,
                      name: item.name_eng,
                      urdu: item.name_urdu,
                      id: item.id,
                    });
                  }}>
                  <Text
                    style={{
                      color: "black",
                      letterSpacing: 0.2,
                      fontSize: 15,
                    }}>
                    {item}
                  </Text>
                </Pressable>
              </>
            ))}
        </ScrollView>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    paddingBottom: "10%",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  ttext: {
    color: "black",
    letterSpacing: 0.2,
    fontSize: 25,
    fontWeight: "bold",
  },
  banner: {
    flexDirection: "column",
    paddingBottom: "5%",
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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
export default Suggestion;
