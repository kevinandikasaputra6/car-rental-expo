import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ParallaxFlatList from "@/components/ParallaxFlatList";
import Constants from "expo-constants";
import { Col, Row } from "../../components/Grid";
import ButtonIcon from "../../components/ButtonIcon";
import CarList from "../../components/CarList";
import { useEffect } from "react";
import { router } from "expo-router";
import Geolocation from "@/components/Geolocation";
import { selectUser } from "@/redux/reducers/auth/authSlice";

import { useSelector, useDispatch } from "react-redux"; //useSelector untuk ambil data, useDispatch untuk jalaninnya
import { getCar, selectCar } from "@/redux/reducers/car/carSlice";

export default function HomeScreen() {
  const user = useSelector(selectUser);
  const { data, isLoading } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCar(signal)); // getCar(signal) > carSlice > fetchCars(carAPI), harus pakai dispatch untuk menjalankan reducer / aksi
    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  return (
    <ParallaxFlatList
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText1}>HI, {user.dataLogin.email}</Text>
            <Geolocation />
          </View>
          <View>
            <Image source={require("@/assets/images/elip.png")} />
          </View>
        </View>
      }
      banner={
        <>
          <View style={styles.banner}>
            <View style={styles.bannerContainer}>
              <View style={styles.bannerTextContainer}>
                <Text style={styles.titleText3}>
                  Sewa Mobil Berkualitas di kawasanmu
                </Text>
                <TouchableOpacity style={styles.bannerButton}>
                  <Text
                    style={{
                      fontFamily: "PoppinsBold",
                      color: "white",
                      fontSize: 16,
                      textAlign: "center",
                    }}
                  >
                    Sewa Mobil
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Image source={require("@/assets/images/img_car.png")} />
              </View>
            </View>
          </View>
          <View>
            <Row justifyContent={"space-between"}>
              <Col>
                <ButtonIcon
                  text={"Sewa Mobil"}
                  name={"car-outline"}
                  color={"#ffffff"}
                />
              </Col>
              <Col>
                <ButtonIcon
                  text={"Oleh-Oleh"}
                  name={"cube-outline"}
                  color={"#ffffff"}
                />
              </Col>
              <Col>
                <ButtonIcon
                  text={"Penginapan"}
                  name={"key-outline"}
                  color={"#ffffff"}
                />
              </Col>
              <Col>
                <ButtonIcon
                  text={"Wisata"}
                  name={"camera-outline"}
                  color={"#ffffff"}
                />
              </Col>
            </Row>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "PoppinsBold",
                color: "black",
              }}
            >
              Daftar Pilihan Mobil
            </Text>
          </View>
        </>
      }
      loading={isLoading}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CarList
          style={{ marginHorizontal: 20 }}
          key={item.id}
          image={{ uri: item.image }}
          carName={item.name}
          passengers={5}
          baggage={4}
          price={item.price}
          onPress={() => router.navigate("(listcar)/details/" + item.id)}
        />
      )}
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  titleText1: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  titleText2: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
  titleText3: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 18,
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -140,
    overflow: "hidden",
    borderRadius: 20,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "50%",
    padding: 24,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 16,
  },
  bannerButton: {
    backgroundColor: "#5cb85f",
    borderRadius: 3,
    padding: 5,
  },
});

// import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
// import Constants from "expo-constants";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedView } from "@/components/ThemedView";
// // import { ThemedText } from "@/components/ThemedText";
// // import { router } from "expo-router";
// import { Row, Col } from "@/components/Grid";
// import ButtonIcon from "../../components/ButtonIcon";
// import CarList from "../../components/CarList";
// import { useState, useEffect } from "react";

// export default function HomeScreen() {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const response = await fetch(
//         "https://api-car-rental.binaracademy.org/customer/car"
//       );
//       const data = await response.json();
//       setCars(data);
//     };
//     getData();
//   }, []);

//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A43333", dark: "#1D3D47" }}
//       headerImage={
//         <View style={styles.container}>
//           <View>
//             <Text style={styles.title1}>Hi, Nama</Text>
//             <Text style={styles.title2}>Your Location</Text>
//           </View>
//           <View>
//             <Image
//               source={require("@/assets/images/elip.png")}
//               style={styles.image}
//             />
//           </View>
//         </View>
//       }
//     >
//       <ThemedView>
//         <View style={styles.banner}>
//           <View style={styles.bannerContainer}>
//             <View style={styles.bannerText}>
//               <Text style={styles.title3}>
//                 Sewa Mobil Berkualitas di Kawasanmu
//               </Text>
//               <TouchableOpacity style={styles.bannerButton}>
//                 <Text
//                   style={{
//                     color: "white",
//                     textAlign: "center",
//                     fontFamily: "PoppinsBold",
//                     fontSize: 16,
//                     padding: 3,
//                   }}
//                 >
//                   Sewa Mobil
//                 </Text>
//               </TouchableOpacity>
//             </View>
//             <View>
//               <Image source={require("@/assets/images/img_car.png")} />
//             </View>
//           </View>
//         </View>
//       </ThemedView>

//       <View>
//         <Row justifyContent={"space-between"}>
//           <Col>
//             <ButtonIcon name={"car-outline"} color={"#ffffff"} />
//           </Col>
//           <Col>
//             <ButtonIcon name={"cube-outline"} color={"#ffffff"} />
//           </Col>
//           <Col>
//             <ButtonIcon name={"key-outline"} color={"#ffffff"} />
//           </Col>
//           <Col>
//             <ButtonIcon name={"camera-outline"} color={"#ffffff"} />
//           </Col>
//         </Row>
//       </View>

//       <View>
//         <Text
//           style={{ fontSize: 20, fontFamily: "PoppinsBold", color: "black" }}
//         >
//           Daftar Pilihan Mobil
//         </Text>
//       </View>

//       <View>
//         {cars.length > 0 ? (
//           cars.map((el) => (
//             <CarList
//               key={el.id}
//               image={{ uri: el.image }}
//               carName={el.name}
//               passengers={4}
//               baggage={2}
//               price={el.price}
//             />
//           ))
//         ) : (
//           <Text>No Cars</Text>
//         )}
//       </View>

//       {/* <ThemedView
//         style={{ justifyContent: "space-between", flexDirection: "row" }}
//       >
//         <View>
//           <View style={styles.icon}>
//             <TouchableOpacity onPress={() => router.navigate("../(auth)")}>
//               <Ionicons name="car" size={40} color={"white"} />
//             </TouchableOpacity>
//           </View>
//           <View>
//             <ThemedText style={styles.iconText}>Sewa Mobil</ThemedText>
//           </View>
//         </View>
//         <View>
//           <View style={styles.icon}>
//             <Ionicons name="cube" size={40} color={"white"} />
//           </View>
//           <View>
//             <ThemedText style={styles.iconText}>Oleh-oleh</ThemedText>
//           </View>
//         </View>
//         <View>
//           <View style={styles.icon}>
//             <Ionicons name="key" size={40} color={"white"} />
//           </View>
//           <View>
//             <ThemedText style={styles.iconText}>Penginapan</ThemedText>
//           </View>
//         </View>
//         <View>
//           <View style={styles.icon}>
//             <Ionicons name="camera" size={40} color={"white"} />
//           </View>
//           <View>
//             <ThemedText style={styles.iconText}>Wisata</ThemedText>
//           </View>
//         </View>
//       </ThemedView> */}
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: Constants.statusBarHeight,
//     alignItems: "center",
//     justifyContent: "space-between",
//     flexDirection: "row",
//     paddingHorizontal: 20,
//   },
//   title1: {
//     fontFamily: "PoppinsBold",
//     fontSize: 14,
//     color: "white",
//   },
//   title2: {
//     fontFamily: "PoppinsBold",
//     fontSize: 16,
//     color: "white",
//   },
//   title3: {
//     fontFamily: "Poppins",
//     fontSize: 18,
//     color: "white",
//   },
//   image: {
//     width: 35,
//     height: 35,
//   },
//   banner: {
//     flex: 1,
//     backgroundColor: "#AF392F",
//     marginTop: -140,
//     overflow: "hidden",
//     borderRadius: 20,
//   },
//   bannerContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//   },
//   bannerText: {
//     width: "50%",
//     padding: 24,
//   },
//   bannerButton: {
//     width: 114,
//     height: 28,
//     backgroundColor: "#5cb85f",
//     borderRadius: 5,
//   },
//   // icon: {
//   //   width: 70,
//   //   height: 70,
//   //   marginTop: 30,
//   //   backgroundColor: "#A43333",
//   //   borderRadius: 10,
//   //   justifyContent: "center",
//   //   alignItems: "center",
//   // },
//   // iconText: {
//   //   fontFamily: "PoppinsBold",
//   //   fontSize: 12,
//   //   color: "black",
//   //   textAlign: "center",
//   // },
// });
