import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Icon } from "react-native-elements";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";

function ManageUsers({ navigation }) {
  const [data, setData] = useState([]);
  const HandleDelete = async (id) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const res = await axios.post(
                `${API_BASE_URL}/admin/removeuser/${id}`
              );
              setData((prevData) => prevData.filter((item) => item.id !== id));

              console.log("User successfully deleted.");
            } catch (error) {
              alert(error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    async function getUsers() {
      const response = await axios.get(`${API_BASE_URL}/user/all`);
      console.log(response.data.data, " data");
      setData(response.data.data);
    }
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-start" }}>
        <Pressable onPress={() => navigation.navigate("adminmenu")}>
          <Icon
            style={styles.icon}
            name='keyboard-backspace'
            color='#5DBB63'
            size={30}
            type='material'
          />
        </Pressable>
      </View>

      <View style={{ paddingBottom: "5%", flexDirection: "row" }}>
        <Text style={styles.ttext} textCenter>
          Manage Users
        </Text>
        <Icon
          style={{ marginLeft: "5%", marginTop: "12%" }}
          name='article'
          color='#5DBB63'
          size={30}
          type='material'
        />
      </View>

      <View style={styles.banner}>
        <ScrollView>
          {(data ?? []).map((item, i) => (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: "4%",
                  paddingVertical: "3%",
                }}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                  }}>
                  <Text
                    style={{
                      color: "black",
                      letterSpacing: 0.2,
                      fontSize: 20,
                    }}>
                    {console.log(item.name, " item")}
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      color: "grey",
                      letterSpacing: 0.2,
                      fontSize: 12,
                    }}>
                    {item.email}
                  </Text>
                </View>

                <Pressable onPress={() => HandleDelete(item.id)}>
                  <Icon
                    style={styles.icon}
                    name='delete'
                    color='#5DBB63'
                    size={30}
                    type='material'
                  />
                </Pressable>
              </View>

              <View
                style={{
                  borderBottomColor: "grey",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                }}
              />
            </>
          ))}
        </ScrollView>
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
    backgroundColor: "#5DBB63",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 2,
    marginBottom: "5%",
  },
  item: {
    color: "#5DBB63",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});
export default ManageUsers;
