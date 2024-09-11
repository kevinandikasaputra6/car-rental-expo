import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCars = createAsyncThunk("fetchCar", async (signal) => {
  const res = await fetch(
    `https://api-car-rental.binaracademy.org/customer/car/`,
    { signal: signal }
  );
  return res?.json(); // hasil dari thunk
});

export const fetchCarDetail = createAsyncThunk(
  //thunk untuk megambil data/fetching API
  "fetchCarDetail",
  async (id, { signal }) => {
    const res = await fetch(
      `https://api-car-rental.binaracademy.org/customer/car/` + id,
      { signal: signal }
    );
    return res?.json();
  }
);

// create async thunk berisi 3 parameter
// 1. pending
// 2. fulfiled
// 3. rejected
