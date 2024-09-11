import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlicing";
import CarList from "@/components/CarList";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});
export default function Step1({ setActiveStep }) {
  const { data } = useSelector(selectCarDetail);
  const [selectedBank, setSelectedBank] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();
  const [selectedMethode, setSelectedMethode] = useState(null);

  const bankName = [
    {
      id: "1",
      nama: "BRI",
      norek: "22343-1643-4677",
      owner: "a.n Jeep Bromo Online",
    },
    {
      id: "2",
      nama: "BCA",
      norek: "2345-345-5667",
      owner: "a.n Jeep Bromo Online",
    },
    {
      id: "3",
      nama: "Mandiri",
      norek: "1234-1234-2345",
      owner: "a.n Jeep Bromo Online",
    },
  ];

  const handlePress = (bank) => {
    if (currentStep === 0) {
      setSelectedBank(bank);
      setSelectedMethode(bank);
    }
  };

  return (
    <View>
      <View style={styles.buttonBack}>
        <View style={styles.textButtonBackContainer}>
          <Text style={styles.textButtonBack}>Pembayaran</Text>
        </View>
      </View>
      <View>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={4}
          baggage={2}
          price={data.price}
        />
        <Text style={styles.text}>Pilih Bank Transfer</Text>
        <Text style={styles.text}>
          Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
          Mobile Banking
        </Text>
      </View>
      <View style={{ marginHorizontal: 10 }}>
        {bankName.map((bank, index) => (
          <TouchableOpacity
            onPress={() => handlePress(bank)}
            disabled={currentStep !== 0}
            key={index}
          >
            <View style={styles.separator}>
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={styles.bankCard}>{bank.nama}</Text>
              </View>
              <View
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={styles.buttonCheck}
                >{`${bank.nama} Transfer`}</Text>
              </View>
              {selectedBank?.id === bank.id && (
                <Ionicons
                  name="checkmark-outline"
                  size={30}
                  color="green"
                  style={{ marginLeft: "auto" }}
                />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <View>
        <Card style={styles.card}>
          <Text style={styles.textCard}>% Pakai Kode Promo</Text>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={styles.input}
              placeholder="Tulis catatanmu di sini"
            />
            <TouchableOpacity style={styles.buttonInput}>
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "PoppinsBold",
                  fontSize: 14,
                }}
              >
                Terapkan
              </Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
      <View>
        <View style={styles.buttonContainer}>
          <View style={styles.iconFooter}>
            <Text
              style={{
                fontFamily: "PoppinsBold",
                fontSize: 16,
                padding: 10,
              }}
            >
              {formatCurrency.format(data.price)}
            </Text>
            <Ionicons name="chevron-down-outline" size={24} color="black" />
          </View>
          <TouchableOpacity
            style={[styles.touchable, !selectedBank && { opacity: 0.5 }]}
            onPress={() => setActiveStep(1)}
            disabled={!selectedBank}
          >
            <Text
              style={{
                color: "white",
                textAlign: "center",
                fontFamily: "PoppinsBold",
                fontSize: 16,
              }}
            >
              Bayar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  bankCard: {
    borderColor: "#999999",
    borderRadius: 6,
    borderWidth: 1,
    paddingVertical: 6,
    width: 75,
    fontFamily: "Poppins",
    fontSize: 16,
    textAlign: "center",
  },

  buttonCheck: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.9)",
    elevation: 6,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 30,
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#999999",
  },
  textCard: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    paddingLeft: 16,
    paddingBottom: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#999999",
    paddingVertical: 10,
    gap: 20,
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    borderColor: "#999999",
    flex: 1,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    borderRadius: 3,
  },
  buttonInput: {
    padding: 10,
    backgroundColor: "#3D7B3F",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#999999",
  },
  footer: {
    position: "fixed",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#eeeeee",
    paddingHorizontal: 20,
  },
  iconFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchable: {
    padding: 10,
    backgroundColor: "#3D7B3F",
    borderRadius: 6,
    marginBottom: 20,
  },
});
