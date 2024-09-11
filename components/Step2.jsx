import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlicing";
import CarList from "@/components/CarList";
import ButtonBack from "@/components/ButtonBack";
import Constant from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import {
  ProgressStep,
  ProgressSteps,
} from "@ouedraogof/react-native-progress-steps";
import * as Clipboard from "expo-clipboard";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

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

export default function Step2({ setActiveStep }) {
  const { data } = useSelector(selectCarDetail);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMethode, setSelectedMethode] = useState(null);

  const [totalBayar, setTotalBayar] = useState(
    formatCurrency.format(data.price)
  );

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  const handlePress = (bank) => {
    setSelectedMethode(bank);
  };

  const handlePay = () => {
    setModalVisible(true);
  };

  return (
    <View>
      <View>
        <View>
          <Text style={styles.text}>Selesaikan Pembayaran Sebelum KIAMAT</Text>
          <Text style={styles.text}>Jum'at 30 Agustus 2024, Jam 00:00 WIB</Text>
        </View>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={4}
          baggage={2}
          price={data.price}
        />
      </View>
      <View>
        <Text
          style={{
            fontFamily: "PoppinsBold",
            fontSize: 16,
            padding: 10,
          }}
        >
          Lakukan transfer ke
        </Text>
        {selectedMethode && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 15,
              marginHorizontal: 20,
            }}
          >
            <Text style={styles.bankCard}>{selectedMethode?.nama}</Text>
            <View
              style={{
                flexDirection: "column",
                fontFamily: "Poppins",
                fontSize: 14,
              }}
            >
              <View>
                <Text
                  style={{ color: "#999999" }}
                >{`${selectedMethode?.nama} Transfer`}</Text>
              </View>
              <View>
                <Text style={{ color: "#999999" }}>
                  {selectedMethode?.owner}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 14,
            color: "#999999",
          }}
        >
          Nomor Rekening
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputPembayaran}
            value={selectedMethode?.norek}
            editable={false}
          />
          <TouchableOpacity
            onPress={() => copyToClipboard(selectedMethode?.norek)}
          >
            <Ionicons name="copy-outline" size={20} color="#999999" />
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 14,
              color: "#999999",
            }}
          >
            Total Bayar
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPembayaran}
              value={totalBayar} // Setel nilai TextInput ke totalBayar
              editable={false}
            />
            <TouchableOpacity onPress={() => copyToClipboard(totalBayar)}>
              <Ionicons name="copy-outline" size={20} color="#999999" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal
        style={{ flex: 1 }}
        visible={modalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View>
            <Text style={styles.textModal}>Konfirmasi Pembayaran</Text>
            <Text style={styles.textModal}>
              Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu
              akan segera kami cek tunggu kurang lebih 10 menit untuk
              mendapatkan konfirmasi.
            </Text>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={styles.text}>Upload Bukti Pembayaran</Text>
            <Text style={styles.text}>
              Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa
              upload bukti bayarmu
            </Text>
          </View>
          <View style={styles.buttonModal}>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                setActiveStep(2);
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "PoppinsBold",
                  fontSize: 16,
                }}
              >
                Upload
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.specialButton} onPress={() => {}}>
              <Text
                style={{
                  color: "#3D7B3F",
                  textAlign: "center",
                  fontFamily: "PoppinsBold",
                  fontSize: 16,
                }}
              >
                Lihat Daftar Pesanan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.step3Footer}>
        <Text style={{ fontFamily: "PoppinsBold", fontSize: 16, padding: 10 }}>
          Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
        </Text>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontFamily: "PoppinsBold",
              fontSize: 16,
            }}
          >
            Konfirmasi Pembayaran
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.specialButton} // Warna berbeda untuk tombol kedua
          onPress={() => {}}
        >
          <Text
            style={{
              color: "#3D7B3F",
              textAlign: "center",
              fontFamily: "PoppinsBold",
              fontSize: 16,
            }}
          >
            Lihat Daftar Pesanan
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },

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
  modalContainer: {
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 4,
    justifyContent: "center",
    flex: 1,
  },
  textModal: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    textAlign: "center",
    padding: 10,
  },
  buttonModal: {
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
  },
  step3Footer: {
    backgroundColor: "#eeeeee",
    marginHorizontal: 6,
  },
  specialButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#3D7B3F",
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  touchable: {
    padding: 10,
    backgroundColor: "#3D7B3F",
    borderRadius: 6,
    marginBottom: 20,
  },
});
