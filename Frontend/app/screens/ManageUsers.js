import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SectionList,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { Icon } from "react-native-elements";
import axios from "axios";
import { recents_list } from "./Dummydata.js";
import { API_BASE_URL } from "../../config.js";

function ManageUsers({ navigation }) {
  const sectionListRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [flag, setFlag] = useState(false);
 

  const HandleDelete = async (id) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/admin/removeuser/${id}`)
      console.log('User successfully deleted.')
    } catch (error) {
      alert(error)
    }
  }
  useEffect(() => {
    async function getUsers() {
        const response = await axios.get(`${API_BASE_URL}/user/all`);
        setData(response.data.data);
        setFlag(false);
    }
    getUsers();
  }, [searchQuery]);
  const scrollToSectionHeader = (sectionIndex) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex: sectionIndex,
      itemIndex: 0,
      viewPosition: 0,
      animated: true,
    });
  };

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
          color='white'
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
                    borderBottomColor: "#5DBB63",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />   
                  <Text
                    style={{
                      color: "black",
                      letterSpacing: 0.2,
                      fontSize: 15,
                    }}>
                    {item.name}
                  </Text>

        <Pressable
                  style={styles.btn2}
                  onPress={HandleDelete(item._id)}>
                  <Text style={{ color: "white", letterSpacing: 0.2 }}>
                    Delete User
                  </Text>
        </Pressable>
              </>
            ))}
          </ScrollView>
          <View
            style={{
              borderBottomColor: "#5DBB63",
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
