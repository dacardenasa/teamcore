import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Finish = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Proccess finished succesfully</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  label: { fontSize: 24, color: "#003670" }
});
