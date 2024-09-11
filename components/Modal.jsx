import { View, Modal } from "react-native";
import React from "react";

export default function ModalPopup({ visible, children }) {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
