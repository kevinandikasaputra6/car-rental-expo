import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlicing";
import CarList from "@/components/CarList";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";

function getDate24() {
  const date24 = new Date(); // your date object
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

export default function step2() {
  const [promoText, setPromoText] = useState(null);
  const { selectedBank, promo } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const dispatch = useDispatch();

  const copyToClipboard = async (text) => {
    const str = text.toString();
    await Clipboard.setStringAsync(str);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.countDownWrapper}>
          <Text style={styles.countDownText}>
            Selesaikan Pembayaran Sebelum
          </Text>
          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: "#FA2C5A" }}
            digitTxtStyle={{ color: "#fff" }}
            timeLabelStyle={{ display: "none" }}
            onFinish={() => Alert("finished")}
            timeToShow={["H", "M", "S"]}
            size={12}
          />
        </View>
        <Text style={styles.countDownDate}>{getDate24()}</Text>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data.price}
        />
        <Text style={styles.textBold}>Lakukan Transfer Ke</Text>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <View style={styles.paymentMethod}>
            <Text style={styles.paymentBox}>{selectedBank.bankName}</Text>
            <View style={styles.paymentText}>
              <Text>{selectedBank.bankName} Transfer</Text>
              <Text>{selectedBank.name}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text>Nomor Rekening</Text>
          <View>
            <Text>12345678</Text>
            <Pressable onPress={() => copyToClipboard(12345678)}>
              <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={14} />
            </Pressable>
          </View>
        </View>
        <View>
          <Text>Total Bayar</Text>
          <View>
            <Text>Rp 20.000</Text>
            <Pressable onPress={() => copyToClipboard(data.price)}>
              <Ionicons color={"#3C3C3C"} name={"copy-outline"} size={14} />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderWidthBottom: 1,
    borderColorBottom: "#D0D0D0",
  },
  paymentBox: {
    width: "30%",
    textAlign: "center",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: "#D0D0D0",
    marginRight: 10,
  },
  check: {
    marginLeft: "auto",
  },
  promosForm: {
    flexDirection: "row",
    marginBottom: 10,
  },
  promoInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: "#000",
    width: "70%",
  },
  promoButton: {
    width: "30%",
    borderWidth: 1,
    borderColor: "#3D7B3F",
  },
  promoTextWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  countDownWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  countDownText: {
    fontFamily: "PoppinsBold",
    fontSize: 17,
  },
  countDownDate: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
});
