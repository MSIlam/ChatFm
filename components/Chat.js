import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, backgroundColor, userID } = route.params;

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
    // GiftedChat.append(previousMessages, newMessages)
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2F4F4F",
          },
          left: {
            backgroundColor: "#FFF8DC",
          },
        }}
      />
    );
  };

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        // Sort messages by createdAt in descending order
        // newMessages.sort((a, b) => b.createdAt - a.createdAt);
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cacheMessages = (await AsyncStorage.getItem("message_list")) || [];
    setMessages(JSON.parse(cacheMessages));
  };

  const cacheMessages = async (messageToCache) => {
    try {
      await AsyncStorage.setItem(
        "message_list",
        JSON.stringify(messageToCache)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        key={Math.random()}
        user={{
          _id: userID,
          username: name,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
