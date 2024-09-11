import { createSlice } from "@reduxjs/toolkit";
import { postOrder, putOrderSlip } from "./orderApi";

const initialState = {
  isLoadingOrder: false,
  carIdOrder: null,
  dataOrder: {},
  errorMessageOrder: null,
  status: "pending",
  dataSlip: {},
  // startRent: null,
  // endRent: null,
  // currentStep: null,
  // paymentCountdown: null,
  // selectedBank: null,
  // promo: null,
  // verificationCountdown: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setCarId: (state, { payload }) => {
      state.carId = payload;
    },
    setStateByName: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    resetState: (state) => {
      console.log("reset state", state);

      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataOrder = action.payload;
      state.status = "success";
      // state.isModalVisible = true;
    });
    builder.addCase(postOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      state.status = "error";
      // state.isError = true;
      // state.isModalVisible = true;
    });

    builder.addCase(putOrderSlip.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(putOrderSlip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.dataSlip = action.payload;
      state.status = "upload-success";
      // state.isModalVisible = true;
    });
    builder.addCase(putOrderSlip.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
      // state.isError = true;
      // state.isModalVisible = true;
    });
  },
});

export { postOrder, putOrderSlip };
export const { setCarId, setStateByName, resetState } = orderSlice.actions;
export const selectOrder = (state) => state.order; //selector
export default orderSlice.reducer;
