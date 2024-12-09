import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";  // Import PaperButton from react-native-paper

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[styles.button, mode === "outlined", style]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 15,  // Adjust padding to make the button bigger
    borderRadius: 30,  // Make button rounded
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",  // Text in uppercase
  },
});
