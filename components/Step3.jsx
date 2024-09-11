import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Step3() {
  return (
    <View>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#999999",
          }}
        >
          Invoice
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPembayaran}
            placeholder="INV/xx/xx-xxx/"
          />
          <TouchableOpacity>
            <Ionicons name="cloud-download" size={20} color="#999999" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#999999",
          }}
        >
          E-Tiket
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputPembayaran: {
    flex: 1,
    fontFamily: "PoppinsBold",
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3C3C3C",
    borderRadius: 3,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});
