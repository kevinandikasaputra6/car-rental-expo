import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Constant from "expo-constants";
import { router } from "expo-router";
import { selectUser, logout } from "@/redux/reducers/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
// import * as SecureStore from "expo-secure-store";
// import { useState, useEffect } from "react";
// import { Ionicons } from "@expo/vector-icons";

export default function profile() {
  const { dataLogin, isLogin } = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {isLogin ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginVertical: "50%",
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("@/assets/images/aku.jpg")}
            />
          </View>
          <Text style={styles.header}>{dataLogin.email}</Text>
          <View style={styles.logout}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                dispatch(logout());
                router.replace("../(auth)");
              }}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.header}>Akun</Text>
          <View style={styles.image}>
            <Image source={require("@/assets/images/alura.png")} />
          </View>
          <Text style={styles.title}>
            Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di
            TMMIN Car Rental lebih mudah
          </Text>
          <View style={styles.button}>
            <Button
              color="#5cb85f"
              title="Register"
              onPress={() => router.navigate("../(auth)/Register")}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constant.statusBarHeight,
  },
  header: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginLeft: 10,
  },
  image: {
    marginTop: 100,
    paddingHorizontal: 40,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginHorizontal: 40,
    textAlign: "center",
  },
  button: {
    width: "50%",
    padding: 24,
    alignContent: "center",
    marginHorizontal: 100,
  },
  logout: {
    width: "100%",
    padding: 10,
    alignContent: "center",
  },
  logoutButton: {
    backgroundColor: "#FF69B4",
    borderRadius: 3,
    padding: 5,
  },
  logoutText: {
    color: "white",
    textAlign: "center",
    fontFamily: "PoppinsBold",
    fontSize: 16,
    padding: 5,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "black",
    padding: 20,
    marginBottom: 30,
  },
});

// const [user, setUser] = useState(null);
// useEffect(() => {
//   const getUser = async () => {
//     try {
//       const userData = await SecureStore.getItemAsync("user");
//       if (userData) {
//         const user = JSON.parse(userData); // Parsing JSON
//         console.log("User data:", user); // Debugging
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     } catch (error) {
//       console.error("Error retrieving user data:", error);
//       setUser(null);
//     }
//   };
//   getUser();
// }, []);

{
  /* <View
          style={{
            padding: 60,
            backgroundColor: "darkblue",
            marginTop: 100,
            elevation: 20,
            margin: 10,
            borderRadius: 600,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: "pink",
            }}
          >
            {user.role}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "PoppinsBold",
              fontSize: 20,
              color: "pink",
            }}
          >
            Email: {user.email}
          </Text>
          <TouchableOpacity
            onPress={() => router.navigate("../(auth)/Register")}
          >
            <Ionicons
              name="logo-snapchat"
              size={200}
              color="pink"
              style={{ alignSelf: "center" }}
            />
          </TouchableOpacity>
        </View> */
}
