import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./carApi";

const carSlice = createSlice({
  name: "car",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
    errorMessage: null,
  },
  reducers: {}, // untuk mengolah data di lokal
  extraReducers: (builder) => {
    // extraReducers untuk mengubah initialState
    builder.addCase(fetchCars.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error;
    });
  },
});

export const getCar = fetchCars;
export const selectCar = (state) => state.car; // untuk mengambil state berbentuk function nama state harus sama dg yg ada di store
export default carSlice.reducer; // agar reducer yang di buat di slice terdaftar di store
