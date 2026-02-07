import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useEffect, useState } from "react";
import { AppState, Button, Image } from "react-native";

export default function Demo() {
  const [appStateVisible, setAppStateVisible] = useState(false);
  //polling for app state changes using AppState api
  const [isrunning, setIsRunning] = useState(false);
  const [loading, setIsLoading] = useState(false);

  //create function to get items
  const fetchToDo = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
      console.log("res", res);
      if (!res.ok) {
        throw new Error("HTTP Error! status: " + res.status);
      }
    } catch (error) {
      console.log();
      console.error("error fetching to-do items", error);
    }
  };
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        nextAppState.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
      }

      nextAppState = nextAppState;
      setAppStateVisible(nextAppState === "active");
      console.log("AppState", nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image source={require("@/assets/images/partial-react-logo.png")} />
      }
    >
      <ThemedView>
        <ThemedText>Demo Component</ThemedText>
        <ThemedText> Current state is: {appStateVisible}</ThemedText>
        <Button onPress={fetchToDo} disabled={loading} title="Fetch ToDo" />
      </ThemedView>
    </ParallaxScrollView>
  );
}
