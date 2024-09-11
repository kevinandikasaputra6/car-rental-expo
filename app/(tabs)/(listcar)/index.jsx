import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useEffect } from "react";
import CarList from "../../../components/CarList";
import Constants from "expo-constants";
import { router } from "expo-router";

import { useSelector, useDispatch } from "react-redux"; //useSelector untuk ambil data, useDispatch untuk jalaninnya
import { getCar, selectCar } from "@/redux/reducers/car/carSlice";
export default function listcar() {
  const { data, isLoading } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCar(signal));
    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  return (
    // Cara 1
    <FlatList
      style={styles.container}
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={
        isLoading ? (
          <ActivityIndicator
            style={{ marginTop: 30 }}
            animating={true}
            size="large"
            color="#00ff00"
          />
        ) : (
          <View>
            <Text
              style={{ fontFamily: "PoppinsBold", fontSize: 30, color: "red" }}
            >
              MOBIL ORA ADA
            </Text>
          </View>
        )
      }
      ListHeaderComponent={<Text style={styles.title}>Daftar Mobil</Text>}
      renderItem={({ item }) => (
        <CarList
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
    paddingTop: Constants.statusBarHeight + 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 15,
  },
});

// import { View, ScrollView, FlatList, Text, StyleSheet } from "react-native";
// import React from "react";
// import { useState, useEffect } from "react";
// import CarList from "../../components/CarList";
// import Constants from "expo-constants";

// export default function ListCar() {
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
// Cara 2
//     <View
//       style={{
//         marginTop: Constants.statusBarHeight,
//         flex: 1,
//         paddingHorizontal: 10,
//       }}
//     >
//       <Text style={styles.title}>Daftar Mobil</Text>
//       <FlatList
//         data={cars}
//         renderItem={({ item }) => (
//           <CarList
//             key={item.id}
//             image={{ uri: item.image }}
//             carName={item.name}
//             passengers={4}
//             baggage={2}
//             price={item.price}
//           />
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
// Cara 3
//     // <ScrollView style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
//     // <Text style={styles.title}>Daftar Mobil</Text>
//     //   <View>
//     //     {cars.length > 0 ? (
//     //       cars.map((el) => (
//     //         <CarList
//     //            key={el.id}
//     //            image={{ uri: el.image }}
//     //            carName={el.name}
//     //            passengers={4}
//     //            baggage={2}
//     //            price={el.price}
//     //         />
//     //       ))
//     //     ) : (
//     //       <Text>No Cars</Text>
//     //     )}
//     //   </View>
//     // </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     fontSize: 20,
//     fontFamily: "PoppinsBold",
//     padding: 20,
//   },
// });
