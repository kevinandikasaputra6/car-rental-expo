import { Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Row, Col } from "./Grid";
import { Ionicons } from "@expo/vector-icons";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function CarList({
  image,
  carName,
  passengers,
  baggage,
  price,
  onPress,
  style,
}) {
  return (
    <Pressable style={{ ...styles.card, ...style }} onPress={onPress}>
      <Row alignItems={"center"} gap={20}>
        <Col>
          <Image style={styles.img} source={image} />
        </Col>
        <Col>
          <Text style={styles.carName}>{carName}</Text>
          <Row gap={10}>
            <Col style={styles.textIcon}>
              <Ionicons name="people-outline" size={20} color="#8A8A8A" />
              <Text style={styles.capacityText}>{passengers}</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Ionicons name="bag-outline" size={20} color="#8A8A8A" />
              <Text style={styles.capacityText}>{baggage}</Text>
            </Col>
          </Row>
          <Text style={styles.price}>{formatCurrency.format(price)}</Text>
        </Col>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 5,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 30,
    margin: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#999999",
  },
  img: {
    width: 100,
    height: 60,
    objectFit: "contain",
  },
  carName: {
    fontSize: 16,
  },
  capacityText: {
    color: "#8A8A8A",
    fontSize: 12,
    fontFamily: "PoppinsBold",
    paddingTop: 5,
    paddingLeft: 5,
  },
  price: {
    color: "#5cb85f",
    fontFamily: "PoppinsBold",
    fontSize: 16,
    paddingTop: 10,
  },
  textIcon: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
});
