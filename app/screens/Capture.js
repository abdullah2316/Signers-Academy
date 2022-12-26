import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Icon } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import {
  Button,
  StyleSheet,
  Text,
  button,
  View,
  Pressable,
} from "react-native";

export default function Capture({ navigation }) {
  const isFocused = useIsFocused();
  const [camera, setCamera] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [img, setImg] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title='grant permission' />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const capturePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      //   camera.pausePreview();
      setImg(data.uri);
      navigation.navigate("display", { path: data.uri });
    }
  };
  return (
    <View style={styles.container}>
      {isFocused && (
        <Camera
          style={styles.camera}
          ref={(ref) => setCamera(ref)}
          ratio={"4:3"}
          useCamera2Api
          type={type}>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={toggleCameraType}>
              <Icon
                style={styles.icon}
                name='switch-camera'
                color='white'
                size={50}
                type='material'
              />
            </Pressable>
            <Pressable style={styles.button} onPress={capturePicture}>
              <Icon
                style={styles.icon}
                name='lens'
                color='white'
                size={50}
                type='material'
              />
            </Pressable>
            <Pressable style={styles.button} onPress={toggleCameraType}>
              <Icon
                style={styles.icon}
                name='flash-on'
                color='white'
                size={50}
                type='material'
              />
            </Pressable>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    allignItems: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "black",

    marginTop: "150%",
  },
  button: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "red",
  },
});
