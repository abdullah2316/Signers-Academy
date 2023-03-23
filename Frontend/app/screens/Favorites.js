import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView , Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { items_list } from "./Dummydata.js";
function Favorites({ navigation }) {
  const [items, setItems] = useState(items_list);
  function handlePress(i, e) {
    setItems(items.filter((_, ind) => i !== ind));
  }
  var source;
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
      <View style={{paddingBottom:"10%"}}>
        <Text style={styles.ttext} textCenter>Favorites</Text>
      </View>
      <View style={styles.banner}>
      <ScrollView >
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
                onPress={() => {navigation.navigate("player", {path: item.path, name: item.name, urdu: item.urdu})}}>
                <Text
                  style={{ color: "white", letterSpacing: 0.2, fontSize: 15 }}>
                  {item.name}
                </Text>
                <Pressable onPress={(e) => handlePress(i, e)}>
                  <Icon
                    style={styles.icon}
                    name='favorite'
                    color='red'
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
});
export default Favorites;
