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

function ManageDict({ navigation }) {
  const sectionListRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [flag, setFlag] = useState(false);
  const onChangeSearch = (query) => setSearchQuery(query);

  const HandleDelete = async (id) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/admin/removeword/${id}`);
      console.log("Word successfully deleted.");
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    async function searchDict() {
      console.log("val:", searchQuery);
      if (searchQuery == "") {
        const response = await axios.get(`${API_BASE_URL}/dictionary/all`);
        setData(response.data.data);
        setFlag(false);
      } else {
        const response = await axios.get(
          `${API_BASE_URL}/dictionary/search?term=${searchQuery}`
        );
        setSearchRes(response.data);
        setFlag(true);
        console.log(searchRes);
      }
    }
    searchDict();
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
      <View style={{ alignItems: "flex-end" }}>
        <Pressable onPress={() => navigation.navigate("addword")}>
          <Icon
            style={styles.icon}
            name='add'
            color='#5DBB63'
            size={30}
            type='material'
          />
        </Pressable>
      </View>
      <View style={{ paddingBottom: "5%", flexDirection: "row" }}>
        <Text style={styles.ttext} textCenter>
          Manage Dictionary
        </Text>
        <Icon
          style={{ marginLeft: "5%", marginTop: "12%" }}
          name='article'
          color='green'
          size={30}
          type='material'
        />
      </View>
      <Searchbar
        style={{ marginBottom: "10%" }}
        placeholder='Search'
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      {flag ? (
        <View style={styles.banner}>
          <ScrollView>
            {(searchRes ?? []).map((item, i) => (
              <>
                <View
                  style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                  }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: "4%",
                  }}>
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate("player", {
                        path: item.video_url,
                        name: item.name_eng,
                        urdu: item.name_urdu,
                        id: item._id,
                      });
                    }}>
                    <Text style={{ color: "black", fontSize: 18 }}>
                      {item.name_eng}
                    </Text>
                  </Pressable>
                  <View style={{ flexDirection: "row", paddingTop: "8%" }}>
                    <Pressable
                      onPress={() => {
                        navigation.navigate("update", {
                          id: item._id,
                          name_eng: item.name_eng,
                          name_urdu: item.name_urdu,
                          video_url: item.video_url,
                        });
                      }}>
                      <Icon
                        style={styles.icon}
                        name='edit'
                        color='#5DBB63'
                        size={30}
                        type='material'
                      />
                    </Pressable>
                    <Pressable onPress={() => HandleDelete(item._id)}>
                      <Icon
                        style={styles.icon}
                        name='delete'
                        color='#5DBB63'
                        size={30}
                        type='material'
                      />
                    </Pressable>
                  </View>
                </View>
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
      ) : (
        <View style={{ flexDirection: "row" }}>
          <SectionList
            style={{ marginBottom: "35%" }}
            ref={sectionListRef}
            sections={data}
            keyExtractor={(item, index) => item + index}
            onScrollToIndexFailed={(info) => {
              console.warn(
                `Failed to scroll to index ${info.index} in section ${info.section}`
              );
            }}
            renderItem={({ item }) => (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingRight: "4%",
                  }}>
                  <Pressable
                    style={styles.item}
                    onPress={() => {
                      navigation.navigate("player", {
                        path: item.link,
                        name: item.eng_word,
                        urdu: item.urdu_word,
                        id: item.id,
                      });
                    }}>
                    <Text style={{ color: "black", fontSize: 18 }}>
                      {item.eng_word}
                    </Text>
                  </Pressable>
                  <View style={{ flexDirection: "row", paddingTop: "8%" }}>
                    <Pressable
                      onPress={() => {
                        console.log("item:", item);
                        navigation.navigate("update", {
                          id: item.id,
                          name_eng: item.eng_word,
                          name_urdu: item.urdu_word,
                          video_url: item.link,
                        });
                      }}>
                      <Icon
                        style={styles.icon}
                        name='edit'
                        color='#5DBB63'
                        size={30}
                        type='material'
                      />
                    </Pressable>
                    <Pressable onPress={() => HandleDelete(item._id)}>
                      <Icon
                        style={styles.icon}
                        name='delete'
                        color='#5DBB63'
                        size={30}
                        type='material'
                      />
                    </Pressable>
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: "grey",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginRight: "3%",
                  }}
                />
              </>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={{ color: "green", fontSize: 25 }}>
                {title.toUpperCase()}
              </Text>
            )}
          />
          <View style={{ flexDirection: "column" }}>
            {(data ?? []).map((item, index) => (
              <Pressable
                key={index}
                onPress={() => scrollToSectionHeader(index)}>
                <Text style={{ color: "black", fontSize: 12 }}>
                  {item.title.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
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
  btn3: {
    backgroundColor: "#5DBB63",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 2,
    marginBottom: "5%",
  },
  item: {
    color: "#5DBB63",
    padding: 20,
    marginVertical: 2,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
});
export default ManageDict;
