import { StyleSheet, View } from "react-native";
import React from "react";

export function Container({ style, children }) {
  return <View style={{ ...styles.container, style }}>{children}</View>;
}

export function Row({ alignItems, justifyContent, gap = 0, style, children }) {
  return (
    <View
      style={{
        ...styles.row,
        alignItems: alignItems ? alignItems : "baseline",
        justifyContent: justifyContent ? justifyContent : "flex-start",
        gap: gap,
        ...style,
      }}
    >
      {children}
    </View>
  );
}

export function Col({ style, children }) {
  return <View style={style}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: "row",
  },
});
