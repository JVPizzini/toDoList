import React from "react";
import { Image, StyleSheet, View } from "react-native";

export function Header() {
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/Logo.png")} />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D0D0D",
    width: "100%",
    height: 173,
    justifyContent: "center",
    alignItems: "center",
  },
});
