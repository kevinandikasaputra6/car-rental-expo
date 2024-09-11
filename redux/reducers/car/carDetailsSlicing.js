import { createSlice } from "@reduxjs/toolkit";
import { fetchCarDetail } from "./carApi";

const carSliceDetail = createSlice({
  name: "carDetail",
  initialState: {
    isLoading: false,
    data: {},
    isError: false,
    errorMessage: null,
  },
  reducers: {
    closeDetails: (state) => {
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCarDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCarDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCarDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error;
    });
  },
});

export const getCarDetail = fetchCarDetail;
export const { closeDetails } = carSliceDetail.actions;
export const selectCarDetail = (state) => state.carDetail; // selector
export default carSliceDetail.reducer;
