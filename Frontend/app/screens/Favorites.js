import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "../../config";
import { items_list } from "./Dummydata.js";
function Favorites({ navigation }) {
  const [items, setItems] = useState([]);
  async function handlePress(i, e) {
    const wid = items[i].id;
    let token = await SecureStore.getItemAsync("token");
    const response = await axios.delete(
      `${API_BASE_URL}/favourite/remove/${wid}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    setItems(items);
  }

  useEffect(() => {
    async function getFavs() {
      let token = await SecureStore.getItemAsync("token");
      const response = await axios.get(`${API_BASE_URL}/favourite/get`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setItems(response.data);
    }
    getFavs();
  }, [items]);

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
      <View style={{ paddingBottom: "10%" }}>
        <Text style={styles.ttext} textCenter>
          Favorites
        </Text>
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
                    {item.name_eng}
                  </Text>
                  <Pressable onPress={(e) => handlePress(i, e)}>
                    <Icon
                      style={styles.icon}
                      name='favorite'
                      color='#5DBB63'
                      size={30}
                      type='material'
                    />
                  </Pressable>
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
export default Favorites;
