import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Video, AVPlaybackStatus } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { API_BASE_URL } from "../../config";

function PSLPlayer({ navigation, route }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [iconName, setIconName] = useState("play-circle-filled");
  const [replay, setReplay] = useState(false);
  const [colreplay, setColreplay] = useState("white");
  const [isliked, setIsliked] = useState("");

  useEffect(() => {
    async function getLikedStatus() {
      let token = await SecureStore.getItemAsync("token");
      console.log(token);

      if (token) {
        
        const response = await axios.get(
          `${API_BASE_URL}/favourite/isfav/${route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data.fav);
        if (response.data.fav) setIsliked("red");
        else setIsliked("white");
      } else {
        setIsliked("#808080");
      }
    }
    async function addtorecent() {
      let token = await SecureStore.getItemAsync("token");
      if (token) {
        const response = await axios.post(
          `${API_BASE_URL}/recent/add/${route.params.id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
      } else {
        console.log("Invalid token");
      }
    }
    getLikedStatus();
    addtorecent();
  }, []);
  const like = async function () {
    if (isliked == "#808080") {
      return;
    }
    try {
      console.log(route.params.id);
      if (isliked == "white") {
        let token = await SecureStore.getItemAsync("token");
        console.log(token);
        const response = await axios.post(
          `${API_BASE_URL}/favourite/add/${route.params.id}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIsliked("red");
      } else if (isliked == "red") {
        let token = await SecureStore.getItemAsync("token");
        const response = await axios.delete(
          `${API_BASE_URL}/favourite/remove/${route.params.id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setIsliked("white");
      }
    } catch (error) {
      console.error(error);
    }
  };

  let link = route.params.path;
  let name = route.params.name;
  let urdu = route.params.urdu;
  console.log(link);
  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(0,0,0,0.8)", "transparent"]}>
      <View style={{ alignItems: "flex-start" }}>
        <Pressable
          onPress={() => {
            navigation.navigate("menu");
          }}>
          <Icon
            style={styles.icon}
            name='keyboard-backspace'
            color='white'
            size={30}
            type='material'
          />
        </Pressable>
      </View>
      <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
        {name}
      </Text>
      <Text style={{ color: "white", textAlign: "center", fontSize: 25 }}>
        {urdu}
      </Text>
      <Video
        ref={video}
        style={styles.video}
        // source={pth}
        source={{
          uri: link,
        }}
        useNativeControls={false}
        resizeMode='stretch'
        // isLooping
        onPlaybackStatusUpdate={(status) => {
          setStatus(() => status);
          // console.log(replay);
          if (status.didJustFinish) {
            replay
              ? video.current.replayAsync()
              : setIconName("play-circle-filled");
          }
        }}
      />
      <View style={styles.buttons}>
        <Pressable
          style={styles.button}
          onPress={() => {
            setReplay(!replay);
          }}>
          <Icon
            style={styles.icon}
            name='file-download'
            color={colreplay}
            size={40}
            type='material'
          />
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => {
            if (status.didJustFinish) {
              setIconName("pause-circle-filled");
              video.current.replayAsync();
            } else if (status.isPlaying) {
              setIconName("play-circle-filled");
              video.current.pauseAsync();
            } else {
              setIconName("pause-circle-filled");
              video.current.playAsync();
            }
          }}>
          <Icon
            style={styles.icon}
            name={iconName}
            color='white'
            size={60}
            type='material'
          />
        </Pressable>

        <Pressable style={styles.button} onPress={like}>
          <Icon
            style={styles.icon}
            name='favorite'
            color={isliked}
            size={30}
            type='material'
          />
        </Pressable>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: "10%",
    paddingTop: "5%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "#333333",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "70%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",

//     justifyContent: "space-between",
//     backgroundColor: "black",
//     paddingBottom: "10%",
//     paddingTop: "15%",
//     paddingLeft: "5%",
//     paddingRight: "5%",
//   },
//   banner: {
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   textInput: {
//     backgroundColor: "black",
//     width: "70%",
//     marginBottom: "5%",
//   },
//   btn: {
//     backgroundColor: "#FF3131",
//     width: "70%",
//     alignItems: "center",
//     paddingTop: "2%",
//     paddingBottom: "2%",
//     borderRadius: 2,
//   },
//   img: {
//     width: "70%",
//     height: 100,
//     resizeMode: "stretch",
//   },
//   ttext: {
//     color: "white",
//     letterSpacing: 0.2,
//   },
//   backgroundVideo: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
// });
export default PSLPlayer;
