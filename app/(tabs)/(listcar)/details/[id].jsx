import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Constant from "expo-constants";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Row, Col } from "@/components/Grid";
import { router, useLocalSearchParams } from "expo-router";
import ButtonBack from "@/components/ButtonBack";
import { useNavigation } from "@react-navigation/native";
// import { resetState } from "@/redux/reducers/order/orderSlice";

import { useSelector, useDispatch } from "react-redux";
import {
  getCarDetail,
  selectCarDetail,
  closeDetails,
} from "@/redux/reducers/car/carDetailsSlicing";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const include = [
  {
    id: "1",
    nama: "Apa saja yang termasuk dalam paket misal durasi max 12 jam",
  },
  {
    id: "2",
    nama: "Sudah termasuk bensin selama 12 jam",
  },
  {
    id: "3",
    nama: "Sudah termasuk Tiket Wisata",
  },
  {
    id: "4",
    nama: "Sudah termasuk pajak",
  },
];

const exclude = [
  {
    id: "1",
    nama: "Tidak termasuk biaya makan sopir Rp 75.000/hari",
  },
  {
    id: "2",
    nama: "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam",
  },
  {
    id: "3",
    nama: "Tidak termasuk akomodasi ",
  },
  {
    id: "4",
    nama: "Sudah termasuk pajak",
  },
];

export default function details() {
  const { id } = useLocalSearchParams();
  const { data } = useSelector(selectCarDetail);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCarDetail(id, { signal }));
    console.log(data);

    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, [id]);

  // const handleBayar = () => {
  //   if (data?.price > 0) {
  //     navigation.goBack();
  //     dispatch(resetState());
  //   } else {
  //     navigation.navigate("(listcar)/details/payment");
  //   }
  // };

  return (
    <View
      style={{
        paddingTop: Constant.statusBarHeight,
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <ButtonBack
        onPress={() => {
          dispatch(closeDetails());
          navigation.goBack();
        }}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.titleHeader}>{data?.name}</Text>
          <Row gap={10}>
            <Col style={styles.textIcon}>
              <Ionicons name="people-outline" size={20} color="#8A8A8A" />
              <Text style={styles.capacityText}>4</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Ionicons name="bag-outline" size={20} color="#8A8A8A" />
              <Text style={styles.capacityText}>2</Text>
            </Col>
          </Row>
        </View>
        <Image source={{ uri: data.image }} style={styles.image} />
        <Row style={styles.card}>
          <Col>
            <Text style={styles.title}>Tentang Paket</Text>
            <Text style={styles.title}>Include</Text>
            <View>
              {include.map((include, index) => (
                <Text key={index} style={styles.item}>
                  {"\u2022"}
                  {include.nama}
                </Text>
              ))}
            </View>
            <Text style={styles.title}>Exclude</Text>
            <View>
              {exclude.map((exclude, index) => (
                <Text key={index} style={styles.item}>
                  {"\u2022"}
                  {exclude.nama}
                </Text>
              ))}
            </View>
          </Col>
        </Row>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={{ fontFamily: "PoppinsBold", fontSize: 16, padding: 10 }}>
          {formatCurrency.format(data.price)}
        </Text>
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.buttonPayment}
            onPress={() => router.navigate("(listcar)/details/payment")}
          >
            <Text style={styles.buttonText}>Lanjutkan Pembayaran</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  item: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "#8A8A8A",
    paddingBottom: 10,
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.9)",
    elevation: 6,
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 20,
    margin: 10,
    marginTop: 60,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#999999",
  },
  textIcon: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  capacityText: {
    color: "#8A8A8A",
    fontSize: 12,
    fontFamily: "PoppinsBold",
    paddingTop: 5,
    paddingLeft: 5,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    paddingBottom: 10,
  },
  header: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  titleHeader: {
    fontFamily: "Poppins",
    fontSize: 20,
  },
  image: {
    width: "100%",
    height: 200,
    objectFit: "contain",
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  footer: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#eeeeee",
  },
  button: {
    width: "100%",
    padding: 10,
    alignContent: "center",
  },
  buttonPayment: {
    backgroundColor: "#3D7B3F",
    borderRadius: 3,
    padding: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
    fontSize: 16,
    padding: 5,
  },
});

/* <FlatList
              data={[
                {
                  key: "Tidak termasuk biaya makan sopir Rp 75.000/hari",
                },
                {
                  key: "Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam",
                },
                { key: "Tidak termasuk akomodasi " },
                { key: "Sudah termasuk pajak" },
              ]}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Text
                      style={styles.titleDeskripsi}
                    >{`\u2022 ${item.key}`}</Text>
                  </View>
                );
              }}
            /> */
