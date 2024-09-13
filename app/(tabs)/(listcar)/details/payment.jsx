import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  SafeAreaView,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlicing";
import CarList from "@/components/CarList";
import ButtonBack from "@/components/ButtonBack";
import Constant from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-paper";
import {
  ProgressStep,
  ProgressSteps,
} from "@ouedraogof/react-native-progress-steps";
import * as Clipboard from "expo-clipboard";
import CountDown from "react-native-countdown-component-maintained";
import { KeyboardAvoidingView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  postOrder,
  resetState,
  putOrderSlip,
  selectOrder,
} from "@/redux/reducers/order/orderSlice";
import { selectUser } from "@/redux/reducers/auth/authSlice";
import moment from "moment";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

function getDate24() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

export default function payment() {
  const { data } = useSelector(selectCarDetail);
  const [selectedBank, setSelectedBank] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMethode, setSelectedMethode] = useState(null);
  const [image, setImage] = useState(null);
  const user = useSelector(selectUser);
  const { dataOrder, status, errorMessage, dataSlip } =
    useSelector(selectOrder);
  const dispatch = useDispatch();
  const widthWindow = Dimensions.get("window").width;

  const [totalBayar, setTotalBayar] = useState(
    formatCurrency.format(data.price)
  );

  const bankName = [
    {
      id: "1",
      nama: "BRI",
      norek: "22343-1643-4677",
      owner: "a.n Kevin Shop",
    },
    {
      id: "2",
      nama: "BCA",
      norek: "2345-345-5667",
      owner: "a.n Kevin Shop",
    },
    {
      id: "3",
      nama: "Mandiri",
      norek: "1234-1234-2345",
      owner: "a.n Kevin Shop",
    },
  ];

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All, // type file yang diijinkan di upload
      allowsEditing: true, // edit foto
      aspect: [16, 9], // ratio image
      quality: 0.2, // kualitas image, semakin tiinggi semakin bagus
    });

    console.log(result);

    if (!result.canceled) {
      // ketika result tidak di cancle,
      console.log(result.assets[0].uri);
      setImage({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName, // nama file
        type: result.assets[0].mimeType, // jenis/type file (png,jpg,svg)
      }); // maka image akan di set ke image uri(image dijadikan text)
    }
  };

  const copyToClipboard = async (text) => {
    const str = text.toString();
    await Clipboard.setStringAsync(str);
  };

  const handleUpload = () => {
    if (image) {
      const formData = new FormData(); //fungsi new formData untuk upload gambar
      formData.append("slip", image); // append image ke formData
      dispatch(
        putOrderSlip({
          formData,
          token: user.dataLogin.access_token,
          id: dataOrder.id,
        })
      ); // dispatch putOrderSlip (formData));
    }
    console.log("image", image);
  };

  useEffect(() => {
    if (status === "upload-success") {
      console.log("upload success", dataOrder);
      setTimeout(() => {
        setCurrentStep(2);
      }, 3000);
    } else {
      console.log(errorMessage);
    }
  }, [status]);

  useEffect(() => {
    setCurrentStep(0);
    dispatch(resetState());
  }, []);

  const handlePress = (bank) => {
    if (currentStep === 0) {
      setSelectedBank(bank);
      setSelectedMethode(bank);
    }
  };

  // const handlePay = () => {
  //   const formData = {
  //     start_rent_at: string,
  //     finish_rent_at: string,
  //     car_id: number,
  //   };
  //   dispatch(postOrder({ formData, token: user.dataLogin.access_token }));
  //   console.log("dataOrder", dataOrder);
  // };

  const handlePay = async () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1));
    setModalVisible(false);

    await dispatch(
      postOrder({
        formData: {
          start_rent_at: moment().format("YYYY-MM-DD"),
          finish_rent_at: moment().add(1, "days").format("YYYY-MM-DD"),
          car_id: data.id,
        },
        token: user.dataLogin.access_token,
      })
    );
  };

  useEffect(() => {
    if (status === "success") {
      console.log("dataOrder", dataOrder);
      setCurrentStep;
    } else {
      console.log(errorMessage);
    }
  }, [status]);

  const handleBack = () => {
    if (currentStep === 0) {
      navigation.goBack();
      dispatch(resetState());
    } else {
      setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{
          paddingTop: Constant.statusBarHeight,
          flex: 1,
          backgroundColor: "#ffffff",
        }}
      >
        <View style={styles.buttonBack}>
          <ButtonBack onPress={handleBack} />
          <View style={styles.textButtonBackContainer}>
            <Text style={styles.textButtonBack}>
              {currentStep === 1 && selectedMethode?.nama
                ? `${selectedMethode?.nama} Transfer`
                : currentStep === 2 && selectedMethode?.nama
                ? "Tiket"
                : "Pembayaran"}
            </Text>
            {currentStep === 1 && selectedMethode?.nama && (
              <Text style={styles.textButtonBack}>
                {`Order ID: ${selectedMethode?.nama} ${selectedMethode?.norek}`}
              </Text>
            )}
            {currentStep === 2 && selectedMethode?.nama && (
              <Text style={styles.textButtonBack}>
                {`Order ID: ${selectedMethode?.nama} ${selectedMethode?.norek}`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.container}>
          <ProgressSteps activeStep={currentStep}>
            <ProgressStep label="Pilih Methode" removeBtnRow={true}>
              <SafeAreaView>
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
                    Kamu bisa membayar dengan transfer melalui ATM, Internet
                    Banking atau Mobile Banking
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
                        <View style={styles.bankCard}>
                          <Text
                            style={{
                              fontFamily: "Poppins",
                              textAlign: "center",
                            }}
                          >
                            {bank.nama}
                          </Text>
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
              </SafeAreaView>
            </ProgressStep>
            <ProgressStep label="Bayar" removeBtnRow={true}>
              <SafeAreaView>
                <View>
                  <View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text style={{ ...styles.text, marginTop: 10 }}>
                        Selesaikan Pembayaran Sebelum
                      </Text>
                      <CountDown
                        until={60 * 60 * 24}
                        size={10}
                        digitStyle={{
                          backgroundColor: "#FA2C5A",
                        }}
                        digitTxtStyle={{ color: "#ffffff" }}
                        timeToShow={["H", "M", "S"]}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                      />
                    </View>
                    <Text style={styles.text}>{getDate24()}</Text>
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
                  {selectedBank && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 15,
                        marginHorizontal: 20,
                      }}
                    >
                      <Text style={{ ...styles.bankCard, textAlign: "center" }}>
                        {selectedMethode?.nama}
                      </Text>
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
                      <TouchableOpacity
                        onPress={() => copyToClipboard(totalBayar)}
                      >
                        <Ionicons
                          name="copy-outline"
                          size={20}
                          color="#999999"
                        />
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
                    <View
                      style={{
                        alignItems: "left",
                        paddingHorizontal: 20,
                        paddingBottom: 30,
                      }}
                    >
                      <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Ionicons name="close-circle" size={30} />
                      </TouchableOpacity>
                    </View>
                    <View>
                      <Text style={styles.textModal}>
                        Konfirmasi Pembayaran
                      </Text>
                      <Text style={styles.textModal}>
                        Terima kasih telah melakukan konfirmasi pembayaran.
                        Pembayaranmu akan segera kami cek tunggu kurang lebih 10
                        menit untuk mendapatkan konfirmasi.
                      </Text>
                      <CountDown
                        until={60 * 10}
                        size={10}
                        digitStyle={{
                          backgroundColor: "#FA2C5A",
                        }}
                        digitTxtStyle={{ color: "#ffffff" }}
                        timeToShow={["M", "S"]}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                        onFinish={() => alert("finished")}
                      />
                    </View>
                    <View style={{ padding: 10 }}>
                      <Text style={styles.text}>Upload Bukti Pembayaran</Text>
                      <Text style={styles.text}>
                        Untuk membantu kami lebih cepat melakukan pengecekan.
                        Kamu bisa upload bukti bayarmu
                      </Text>
                    </View>
                    <View>
                      <Pressable style={styles.cardPdf} onPress={pickImage}>
                        {image ? (
                          <Image
                            source={{ uri: image.uri }}
                            style={{
                              flex: 1,
                              width: widthWindow * 0.9,
                              marginHorizontal: "auto",
                            }}
                          />
                        ) : (
                          <View style={{ alignItems: "center" }}>
                            <Ionicons name="image" size={30} />
                          </View>
                        )}
                      </Pressable>
                    </View>
                    <View style={styles.buttonModal}>
                      <TouchableOpacity
                        style={styles.touchable}
                        onPress={handleUpload}
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
                      <TouchableOpacity
                        style={styles.specialButton}
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
                </Modal>
              </SafeAreaView>
            </ProgressStep>
            <ProgressStep label="Tiket" removeBtnRow={true}>
              <SafeAreaView>
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
                      <Ionicons
                        name="cloud-download"
                        size={20}
                        color="#999999"
                      />
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
                  <View>
                    <View style={styles.cardPdf} onPress={pickImage}>
                      {image ? (
                        <Image
                          source={{ uri: dataSlip.slip }}
                          style={{ flex: 1, width: widthWindow * 0.9 }}
                        />
                      ) : (
                        <View style={{ alignItems: "center" }}>
                          <Ionicons name="image" size={30} />
                        </View>
                      )}
                    </View>
                  </View>
                  <Text
                    style={{
                      fontFamily: "Poppins",
                      fontSize: 10,
                      paddingTop: 10,
                    }}
                  >
                    Tunjukkan tiket ini ke petugas JBO di pos penjemputan Anda.
                  </Text>
                </View>
              </SafeAreaView>
            </ProgressStep>
          </ProgressSteps>
        </View>
        <View style={styles.footer}>
          {currentStep === 0 && (
            <View>
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
                onPress={handlePay}
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
          )}
          {currentStep === 1 && (
            <View style={styles.step3Footer}>
              <Text
                style={{ fontFamily: "PoppinsBold", fontSize: 16, padding: 10 }}
              >
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
          )}
          {currentStep === 2 && (
            <View style={{ padding: 10 }}>
              <TouchableOpacity
                style={[
                  styles.specialButton,
                  !selectedBank && { opacity: 0.5 },
                ]}
                disabled={!selectedBank}
                onPress={() => router.navigate("(listcar)")}
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
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
    borderRadius: 3,
    marginBottom: 20,
  },
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  bankCard: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#999999",
    borderRadius: 3,
    fontFamily: "Poppins",
    marginRight: 10,
    width: "25%",
  },
  buttonBack: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  textButtonBack: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    color: "black",
  },
  textButtonBackContainer: {
    marginLeft: 10,
  },
  buttonCheck: {
    fontSize: 16,
    fontFamily: "Poppins",
  },
  card: {
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    shadowColor: "rgba(0, 0, 0, 0.9)",
    elevation: 6,
    borderRadius: 3,
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
    paddingVertical: 20,
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
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
  inputPembayaran: {
    flex: 1,
    fontFamily: "PoppinsBold",
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
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  textStep3: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
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
  cardPdf: {
    justifyContent: "center",
    borderStyle: "dashed",
    borderRadius: 3,
    marginHorizontal: 10,
    backgroundColor: "#D0D0D0",
    borderWidth: 1,
    borderColor: "gray",
    height: 200,
    overflow: "hidden",
  },
});
