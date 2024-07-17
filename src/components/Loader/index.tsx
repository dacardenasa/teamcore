import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const _Loader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#1A3063" size="large" />
    </View>
  );
};

export const Loader = React.memo(_Loader);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white"
  }
});
