import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  ProgressStep,
  ProgressSteps,
} from "@ouedraogof/react-native-progress-steps";

import Progres1 from "./Steps/Progres1";
import Progres2 from "./Steps/Progres2";
import Progres3 from "./Steps/Progres3";

import { selectCarDetail } from "@/redux/reducers/car/carDetailsSlicing";
import { selectOrder, setStateByName } from "@/redux/reducers/order/orderSlice";
import { useDispatch, useSelector } from "react-redux";

export default function index() {
  const { data } = useSelector(selectCarDetail);
  const { activeStep, selectedBank } = useSelector(selectOrder);
  const dispatch = useDispatch();
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ProgressSteps activeStep={activeStep}>
        <ProgressStep label="Pilih Metode" removeBtnRow={true}>
          <Progres1 />
        </ProgressStep>
        <ProgressStep label="Bayar" removeBtnRow={true}>
          <Progres2 />
        </ProgressStep>
        <ProgressStep label="Tiket" removeBtnRow={true}>
          <Progres3 />
        </ProgressStep>
      </ProgressSteps>
      <View style={styles.footer}>
        <Text style={styles.price}>{data.price}</Text>
        <Button
          disabled={!selectedBank && true}
          color="#3D7B3F"
          onPress={() => {
            dispatch(setStateByName({ name: "activeStep", value: 1 }));
          }}
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
});
