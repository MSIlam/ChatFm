import { initializeApp } from "firebase/app";
// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";
import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { Alert, LogBox } from "react-native";

import { getStorage } from "firebase/storage";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";

// new
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// hiding log masseges
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import react Navigation
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  const firebaseConfig = {
    apiKey: "AIzaSyAbZgP6J_4Mb1jPYo6AFKPUy8P184Uq-eE",
    authDomain: "chatfm-5672c.firebaseapp.com",
    projectId: "chatfm-5672c",
    storageBucket: "chatfm-5672c.appspot.com",
    messagingSenderId: "782674145726",
    appId: "1:782674145726:web:98cf611379145f8a4209ef",
  };

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  // Initialize Firebase Storage handler
  const storage = getStorage(app);

  const startScreenBackgroundImage = require("./img/background-img.png");

  // Initialize Firebase Auth with AsyncStorage
  // const auth = initializeAuth(app, {
  //   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  // });
  return (
    // <View style={styles.container}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start">
          {(props) => (
            <Start {...props} backgroundImage={startScreenBackgroundImage} />
          )}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    // </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

export default App;
