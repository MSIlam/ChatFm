import { getAuth, signInAnonymously } from "firebase/auth";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ImageBackground,
  Alert,
} from "react-native";

const Start = ({ navigation, backgroundImage }) => {
  const auth = getAuth();
  const [name, setName] = useState("");
  const [color, setColor] = useState("#3498db");
  const [error, setError] = useState(""); // New state for error message

  // function for user sign in
  const signInUser = () => {
    if (!name.trim()) {
      setError("Please enter a username"); // Show error if username is empty
      return;
    }

    signInAnonymously(auth)
      .then((result) => {
        console.log("Result from signin", result.user.uid);
        navigation.navigate("Chat", {
          userID: result.user.uid,
          // user: user,
          name: name,
          backgroundColor: color,
        });
        setError(""); // Clear the error
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      });
  };

  const handleBackgroundColor = (color) => {
    setColor(color);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        // source={require("../img/background-img.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.apptitle}>FmChat</Text>
        <View style={styles.startview}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your name here"
          />
          {/* Show error message */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View>
            <Text>Choose background color</Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: "#ADD8E6",
                    borderColor: color === "#ADD8E6" ? "black" : "transparent",
                  },
                ]}
                onPress={() => handleBackgroundColor("#ADD8E6")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: "#556B2F",
                    borderColor: color === "#556B2F" ? "black" : "transparent",
                  },
                ]}
                onPress={() => handleBackgroundColor("#556B2F")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: "#8B4513",
                    borderColor: color === "#8B4513" ? "black" : "transparent",
                  },
                ]}
                onPress={() => handleBackgroundColor("#8B4513")}
              ></TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.colorCircle,
                  {
                    backgroundColor: "#BC8F8F",
                    borderColor: color === "#BC8F8F" ? "black" : "transparent",
                  },
                ]}
                onPress={() => handleBackgroundColor("#BC8F8F")}
              ></TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Join chat</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  apptitle: {
    fontSize: 42,
    marginTop: 120,
    marginBottom: 120,
    color: "#483D8B",
    fontWeight: "bold",
  },
  startview: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "88%",
    height: "50%",
    borderRadius: 5,
  },
  textInput: {
    justifyContent: "center",
    alignItems: "center",
    width: "88%",
    padding: 10,
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  colorContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
    borderWidth: 2,
  },
  button: {
    width: "88%",
    height: 40,
    backgroundColor: "#483D8B",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  errorText: {
    color: "red",
    marginTop: 0,
    marginBottom: 5,
  },
});

export default Start;

// {Platform.OS === "android" ? (
//   <KeyboardAvoidingView behavior="height" />
// ) : null}
// {Platform.OS === "ios" ? (
//   <KeyboardAvoidingView behavior="padding" />
// ) : null}
