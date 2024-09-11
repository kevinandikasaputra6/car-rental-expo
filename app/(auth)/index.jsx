import {
  View,
  Text,
  Image,
  TextInput,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_login,
  selectUser,
  closeModal,
} from "@/redux/reducers/auth/authSlice";

import * as Yup from "yup";
import { Formik } from "formik";

import auth from "@react-native-firebase/auth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(2, "Terlalu Pendek!")
    .max(20, "Terlalu Panjang!")
    .required("Required"),
});

export default function Login() {
  const { errorMessage, isModalVisible, isError } = useSelector(selectUser); // untuk mengetahui variable ini berjalan atau tidak kita bisa pakai useEffect
  const dispatch = useDispatch();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const handleChange = (name, text) => {
  //   setFormData({ ...formData, [name]: text });
  //   // console.log(formData); //untuk cek apakah sudah sesuai atau belum
  // }; // fungsi handleChange untuk mengubah state secara dinamis, jika hanya email/pass yang diganti yang lainnya msih ada

  const handleRegister = async (formData) => {
    console.log("test submit", formData);
    try {
      await dispatch(POST_login(formData));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) router.replace("../(tabs)");
      }, 2000);
    }
  }, [isModalVisible]);

  // const handleBack = () => {
  //   if (currentStep === 0) {
  //     navigation.goBack();
  //   } else {
  //     setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  //   }
  // };

  const [showPassword, setShowPassword] = useState(false);

  const handlePressIn = () => {
    setShowPassword(true);
  };

  const handlePressOut = () => {
    setShowPassword(false);
  };

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const {
        data: { idToken },
      } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log("test", idToken, googleCredential);
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }
    // Sign-in the user with the credential
  }

  // ambil data user
  function onAuthStateChanged(user) {
    console.log(user);
    // if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor={"black"} barStyle={"light-content"} />
      <Image
        source={require("@/assets/images/logo.png")}
        style={{
          padding: 20,
          marginTop: 10,
          marginBottom: 30,
          marginLeft: 10,
        }}
      />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={(values) => handleRegister(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email</Text>
                <View style={styles.icon}>
                  <TextInput
                    onBlur={handleBlur("email")}
                    onChangeText={handleChange("email")}
                    style={styles.formInput}
                    placeholder="contoh:johndee@gmail.com"
                  />
                  <TouchableOpacity style={{ padding: 10 }}>
                    <Ionicons name="mail" size={24} color={"gray"} />
                  </TouchableOpacity>
                </View>
                {errors.email && touched.email ? (
                  <Text
                    style={{
                      color: "#ff6781",
                      fontFamily: "PoppinsBold",
                      fontSize: 12,
                    }}
                  >
                    {errors.email}
                  </Text>
                ) : null}
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Password</Text>
                <View style={styles.icon}>
                  <TextInput
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    style={styles.formInput}
                    secureTextEntry={!showPassword}
                    placeholder="6+ karakter"
                  />
                  <TouchableOpacity
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off" : "eye"}
                      size={24}
                      color={"gray"}
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password ? (
                  <Text
                    style={{
                      color: "#ff6781",
                      fontFamily: "PoppinsBold",
                      fontSize: 12,
                    }}
                  >
                    {errors.password}
                  </Text>
                ) : null}
              </View>
              <View style={styles.formContainer}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={handleSubmit}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontFamily: "PoppinsBold",
                      fontSize: 16,
                    }}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>

                <Text style={styles.textRegister}>
                  Don't have an account?
                  <Link style={styles.linkRegister} href="./Register">
                    Sign up for free
                  </Link>
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: 6,
                  }}
                >
                  <Text style={{ fontFamily: "Poppins", fontSize: 16 }}>
                    or Login With :
                  </Text>
                  <GoogleSigninButton
                    size={GoogleSigninButton.Size.Icon}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={onGoogleButtonPress}
                    // disabled={isInProgress}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>

      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <>
              <Ionicons
                name="close-circle"
                size={30}
                color="red"
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.modalText}>{errorMessage}</Text>
            </>
          ) : (
            <>
              <Ionicons
                name="checkmark-circle"
                size={30}
                color="green"
                style={{ alignSelf: "center" }}
              />
              <Text style={styles.modalText}>Berhasil Masuk</Text>
            </>
          )}
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    textAlign: "center",
    color: "black",
    fontFamily: "PoppinsBold",
    marginVertical: 20,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  formLabel: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  formInput: {
    flex: 1,
    padding: 10,
    fontSize: 14,
    fontFamily: "PoppinsBold",
  },
  textRegister: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    fontFamily: "Poppins",
  },
  linkRegister: {
    fontFamily: "PoppinsBold",
    color: "blue",
    textDecorationLine: "underline",
  },
  touchable: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginBottom: 30,
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
    alignItems: "center",
  },
  modalText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  icon: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 8,
  },
});
