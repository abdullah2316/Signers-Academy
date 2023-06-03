import React from "react";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import * as SecureStore from "expo-secure-store";
import Icon from "react-native-vector-icons/Entypo";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
function MyMenu({ navigation, route }) {
  const [hasToken, setHasToken] = React.useState(false);
  React.useEffect(() => {
    async function checkKey() {
      const token = await SecureStore.getItemAsync("token");
      setHasToken(Boolean(token));
    }
    checkKey();
  }, []);

  async function logout() {
    try {
      await SecureStore.deleteItemAsync("token");
      setHasToken(false);
      console.log(`Key  removed from secure store`);
      navigation.navigate("login");
    } catch (error) {
      console.log(`Error removing key  from secure store: ${error}`);
    }
  }
  return (
    <>
      <View
        style={{
          flex: 0.05,
          backgroundColor: "white",
          paddingTop: "10%",
          paddingRight: "5%",
        }}>
        {hasToken && (
          <MenuProvider>
            <Menu>
              <MenuTrigger>
                <View>
                  <Icon
                    style={{ alignSelf: "flex-end" }}
                    name='dots-three-vertical'
                    size={20}
                    color='white'
                  />
                </View>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={logout}>
                  <Text>Logout</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </MenuProvider>
        )}
      </View>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Image style={styles.img} source={require("../assets/signers.png")} />
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.ttext}>Signers</Text>
          <Text style={styles.ttext}>Academy</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("capture")}>
            <Text style={{ color: "white", letterSpacing: 0.2 }}>Capture</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            onPress={() => navigation.navigate("dictionary")}>
            <Text style={{ color: "white", letterSpacing: 0.2 }}>
              Dictionary
            </Text>
          </Pressable>
          {hasToken && (
            <>
              <Pressable
                onPress={() => navigation.navigate("favorites")}
                style={styles.btn}>
                <Text style={{ color:"white", letterSpacing: 0.2 }}>
                  Favorites
                </Text>
              </Pressable>
              <Pressable
                style={styles.btn}
                onPress={() => navigation.navigate("recent")}>
                <Text style={{ color: "white", letterSpacing: 0.2 }}>
                  Recents
                </Text>
              </Pressable>
              <Pressable style={styles.btn}>
                <Text style={{ color: "white", letterSpacing: 0.2 }}>
                  Suggested
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingBottom: "10%",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  ttext: {
    color: "black",
    letterSpacing: 0.2,
    fontSize: 30,
    fontWeight: "bold",
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
    backgroundColor: "#5DBB63",
    width: "70%",
    alignItems: "center",
    paddingTop: "2%",
    paddingBottom: "2%",
    borderRadius: 100,
    marginBottom: "10%",
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
export default MyMenu;
