import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";

export const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("@/assets/images/teamcore.svg")}
        placeholder="teamcore"
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  image: { width: 200, height: 50 }
});
