import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlicing";
import CarList from "@/components/CarList";
import ButtonBack from "@/components/ButtonBack";
import { Ionicons } from "@expo/vector-icons";

const paymentMethods = [
  { bankName: "BCA", account: 12345678, name: "a. n Super Travel" },
  { bankName: "MANDIRI", account: 12345678, name: "a. n Super Travel" },
  { bankName: "BNI", account: 12345678, name: "a. n Super Travel" },
];

export default function step1() {
  const [promoText, setPromoText] = useState(null);
  const { selectedBank, promo } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data.price}
        />
        <Text style={styles.textBold}>Pilih Bank Transfer</Text>
        <Text style={styles.textBold}>
          Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
          Mobile Banking
        </Text>
        <View
          style={{
            marginBottom: 10,
          }}
        >
          {paymentMethods.map((e) => (
            <ButtonBack
              key={e.bankName}
              style={styles.paymentMethod}
              onPress={() =>
                dispatch(setStateByName({ name: "selectedBank", value: e }))
              }
            >
              <Text style={styles.paymentBox}>{e.bankName}</Text>
              <Text style={styles.paymentText}>{e.bankName} Transfer</Text>
              {selectedBank?.bankName === e.bankName && (
                <Ionicons
                  style={styles.check}
                  color={"#3D7B3F"}
                  size={20}
                  name={"checkmark"}
                />
              )}
            </ButtonBack>
          ))}
        </View>
        <View style={styles.promos}>
          <Text style={styles.textBold}>% Pakai Kode Promo</Text>
          <View style={styles.promosForm}>
            {!promo ? (
              <>
                <TextInput
                  style={styles.promoInput}
                  onChangeText={(val) => setPromoText(val)}
                  placeholder="Tulis promomu disini"
                />
                <Button
                  style={styles.promoButton}
                  onPress={() =>
                    dispatch(
                      setStateByName({
                        name: "promo",
                        value: promoText,
                      })
                    )
                  }
                  title={"Terapkan"}
                  color="#3D7B3F"
                />
              </>
            ) : (
              <View style={styles.promoTextWrapper}>
                <Text style={styles.promoText}>{promo}</Text>
                <Pressable
                  onPress={() =>
                    dispatch(
                      setStateByName({
                        name: "promo",
                        value: null,
                      })
                    )
                  }
                >
                  <Ionicons
                    style={styles.check}
                    color={"#880808"}
                    size={30}
                    name={"close"}
                  />
                </Pressable>
              </View>
            )}
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
});
