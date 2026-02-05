import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useEffect, useState } from "react";
import { AppState, Image } from "react-native";

export default function Demo() {
  const [appStateVisible, setAppStateVisible] = useState(false);
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
      </ThemedView>
    </ParallaxScrollView>
  );
}
