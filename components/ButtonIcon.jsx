import { StyleSheet, Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function ButtonIcon({ onPress, text, style, ...rest }) {
  // rest = untuk atribut lain yang dimasukkan di icon
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.box}>
        <Ionicons size={30} style={style} {...rest} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  box: {
    borderRadius: 10,
    backgroundColor: "#A43333",
    padding: 20,
  },
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 12,
    textAlign: "center",
    minWidth: 70,
  },
});
