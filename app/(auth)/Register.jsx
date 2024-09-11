import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import ModalPopup from "../../components/Modal";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { Formik } from "formik";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Terlalu Pendek!")
    .max(50, "Terlalu Panjang!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Terlalu Pendek!")
    .max(20, "Terlalu Panjang!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Harus mengandung 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter spesial"
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password harus cocok")
    .required("Wajib diisi"),
});

export default function Register() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [fullName, setFullName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (values) => {
    try {
      const req = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            role: "customer",
          }),
        }
      );
      const body = await req.json();
      console.log(body);
      if (!req.ok)
        throw new Error(
          body.message || body.errors[0].message || "Something Went Wrong"
        );
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        router.navigate("/");
      }, 1000);
    } catch (e) {
      setError(e.message);
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        setError(null);
      }, 1000);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View>
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
        <Text style={styles.heading}>Sign Up</Text>

        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
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
                  <Text style={styles.formLabel}>Name*</Text>
                  <View style={styles.icon}>
                    <TextInput
                      onBlur={handleBlur("name")}
                      onChangeText={handleChange("name")}
                      style={styles.formInput}
                      placeholder="Full name"
                    />
                    <Ionicons name="skull" size={24} color={"gray"} />
                  </View>
                  {errors.name && touched.name ? (
                    <Text
                      style={{
                        color: "#ff6781",
                        fontFamily: "PoppinsBold",
                        fontSize: 12,
                      }}
                    >
                      {errors.name}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.formContainer}>
                  <Text style={styles.formLabel}>Email*</Text>
                  <View style={styles.icon}>
                    <TextInput
                      onBlur={handleBlur("email")}
                      onChangeText={handleChange("email")}
                      style={styles.formInput}
                      placeholder="contoh:johndee@gmail.com"
                    />
                    <TouchableOpacity>
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
                  <Text style={styles.formLabel}>Create Password</Text>
                  <View style={styles.icon}>
                    <TextInput
                      onBlur={handleBlur("password")}
                      onChangeText={handleChange("password")}
                      style={styles.formInput}
                      secureTextEntry={!isPasswordVisible}
                      placeholder="6+ karakter"
                    />
                    <TouchableOpacity onPress={togglePasswordVisibility}>
                      <Ionicons
                        name={isPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
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
                  <Text style={styles.formLabel}>Confirm Password*</Text>
                  <View style={styles.icon}>
                    <TextInput
                      onBlur={handleBlur("confirmPassword")}
                      onChangeText={handleChange("confirmPassword")}
                      style={styles.formInput}
                      secureTextEntry={!isConfirmPasswordVisible}
                      placeholder="Confirm password"
                    />
                    <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
                      <Ionicons
                        name={isConfirmPasswordVisible ? "eye-off" : "eye"}
                        size={24}
                        color="gray"
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <Text
                      style={{
                        color: "#ff6781",
                        fontFamily: "PoppinsBold",
                        fontSize: 12,
                      }}
                    >
                      {errors.confirmPassword}
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
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <Text style={styles.textRegister}>
                    Already have an account?
                    <Link style={styles.linkRegister} href="/">
                      Sign In here
                    </Link>
                  </Text>
                </View>
              </>
            )}
          </Formik>
        </View>

        <ModalPopup visible={modalVisible}>
          <View style={styles.modalBackground}>
            {error != null ? (
              <>
                <Ionicons
                  name="close-circle-outline"
                  size={100}
                  color="pink"
                  style={{ alignSelf: "center" }}
                />
                <Text style={styles.modalText}>{error}</Text>
              </>
            ) : (
              <>
                <Ionicons
                  name="checkmark-done-circle-outline"
                  size={100}
                  color="pink"
                  style={{ alignSelf: "center" }}
                />
                <Text style={styles.modalText}>Berhasil Register</Text>
              </>
            )}
          </View>
        </ModalPopup>
      </View>
    </KeyboardAwareScrollView>
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
    fontSize: 30,
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
