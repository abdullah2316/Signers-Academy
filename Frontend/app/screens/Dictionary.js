import React, { useState, useEffect } from "react";
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
import { recents_list } from "./Dummydata.js";

const DATA = [
  {
    title: "A",
    data: ["apple", "ant", "axe"],
  },
  {
    title: "B",
    data: ["book", "bun", "bing"],
  },
  {
    title: "C",
    data: ["cat", "coat", "can"],
  },
  {
    title: "D",
    data: ["desktop", "ditch"],
  },
];

function Dictionary({ navigation }) {
  const [items, setItems] = useState(recents_list);
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  function handlePress(i, e) {
    // setItems(items.filter((_, ind) => i !== ind));
  }

//  useEffect(() => {
   
//  }, [third])
 

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-start" }}>
        <Pressable onPress={() => navigation.navigate("menu")}>
          <Icon
            style={styles.icon}
            name='keyboard-backspace'
            color='white'
            size={30}
            type='material'
          />
        </Pressable>
      </View>
      <View style={{ paddingBottom: "5%", flexDirection: "row" }}>
        <Text style={styles.ttext} textCenter>
          Dictionary
        </Text>
        <Icon
          style={{ marginLeft: "5%", marginTop: "12%" }}
          name='article'
          color='white'
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
      <View style={{ flexDirection: "row" }}>
        <SectionList
          style={{ marginBottom: "35%" }}
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <Pressable style={styles.item}>
              <Text style={{ color: "white" }}>{item}</Text>
            </Pressable>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ color: "#FF3131", fontSize: 20 }}>{title}</Text>
          )}
        />
        <View style={{ flexDirection: "column" ,justifyContent:"space-between"}}>
          <Text style={{ color: "white", fontSize: 8 }}>A</Text>
          <Text style={{ color: "white", fontSize: 8 }}>B</Text>
          <Text style={{ color: "white", fontSize: 8 }}>C</Text>
          <Text style={{ color: "white", fontSize: 8 }}>D</Text>
          <Text style={{ color: "white", fontSize: 8 }}>E</Text>
          <Text style={{ color: "white", fontSize: 8 }}>F</Text>
          <Text style={{ color: "white", fontSize: 8 }}>G</Text>
          <Text style={{ color: "white", fontSize: 8 }}>H</Text>
          <Text style={{ color: "white", fontSize: 8 }}>I</Text>
          <Text style={{ color: "white", fontSize: 8 }}>J</Text>
          <Text style={{ color: "white", fontSize: 8 }}>K</Text>
          <Text style={{ color: "white", fontSize: 8 }}>L</Text>
          <Text style={{ color: "white", fontSize: 8 }}>M</Text>
          <Text style={{ color: "white", fontSize: 8 }}>N</Text>
          <Text style={{ color: "white", fontSize: 8 }}>O</Text>
          <Text style={{ color: "white", fontSize: 8 }}>P</Text>
          <Text style={{ color: "white", fontSize: 8 }}>Q</Text>
          <Text style={{ color: "white", fontSize: 8 }}>R</Text>
          <Text style={{ color: "white", fontSize: 8 }}>S</Text>
          <Text style={{ color: "white", fontSize: 8 }}>T</Text>
          <Text style={{ color: "white", fontSize: 8 }}>U</Text>
          <Text style={{ color: "white", fontSize: 8 }}>V</Text>
          <Text style={{ color: "white", fontSize: 8 }}>W</Text>
          <Text style={{ color: "white", fontSize: 8 }}>X</Text>
          <Text style={{ color: "white", fontSize: 8 }}>Y</Text>
          <Text style={{ color: "white", fontSize: 8 }}>Z</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    paddingBottom: "10%",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  ttext: {
    color: "white",
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
  item: {
    color: "#f9c2ff",
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
export default Dictionary;
