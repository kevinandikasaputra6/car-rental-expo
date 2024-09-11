import { View } from "react-native";
import { Stack } from "expo-router";
import Constants from "expo-constants";

export default function () {
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </View>
  );
}
