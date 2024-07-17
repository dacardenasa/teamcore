import { ButtonColors } from "@/src/constants";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps
} from "react-native";


type ButtonProps = TouchableOpacityProps & {
  title: string;
  type: "primary" | "secondary" | "danger";
  handlePress: () => void;
};

const _Button = ({ title, type, handlePress, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ ...styles.container, backgroundColor: ButtonColors[type] }}
      {...rest}
    >
      <Text
        style={{
          ...styles.title,
          ...(type === "danger" ? { color: "white" } : {})
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const Button = React.memo(_Button);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4
  },
  title: {
    color: "#253752",
    fontWeight: "bold"
  }
});
