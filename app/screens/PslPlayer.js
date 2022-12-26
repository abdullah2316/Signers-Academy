import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import { Icon } from "react-native-elements";
import { Video, AVPlaybackStatus } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
function PSLPlayer({ navigation }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [iconName, setIconName] = useState("play-circle-filled");
  const [replay, setReplay] = useState(false);
  const [colreplay, setColreplay] = useState("white");
  useEffect(() => {
    // Update the document title using the browser API
    replay ? setColreplay("#24a0ed") : setColreplay("white");
  });
  return (
    <LinearGradient
      style={styles.container}
      colors={["rgba(0,0,0,0.8)", "transparent"]}>
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
      <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
        Lamp
      </Text>
      <Text style={{ color: "white", textAlign: "center", fontSize: 25 }}>
        لیمپ
      </Text>
      <Video
        ref={video}
        style={styles.video}
        source={require("../assets/lamp.mp4")}
        useNativeControls={false}
        resizeMode='contain'
        // isLooping
        onPlaybackStatusUpdate={(status) => {
          setStatus(() => status);
          console.log(replay);
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
            name='replay'
            color={colreplay}
            size={30}
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

        <Pressable
          style={styles.button}
          o
          onPress={() => video.current.replayAsync()}>
          <Icon
            style={styles.icon}
            name='favorite'
            color='red'
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
    width: "70%",
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
