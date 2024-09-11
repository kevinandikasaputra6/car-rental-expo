import { createAsyncThunk } from "@reduxjs/toolkit";

export const postOrder = createAsyncThunk(
  "postOrder",
  async ({ token, formData }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "access-token": token,
          },
          body: JSON.stringify({
            start_rent_at: formData.start_rent_at,
            finish_rent_at: formData.finish_rent_at,
            car_id: formData.car_id,
          }),
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);

      return body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const putOrderSlip = createAsyncThunk(
  "putOrderSlip",
  async ({ token, formData, id }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://api-car-rental.binaracademy.org/customer/order/" +
          id +
          "/slip",
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            "access-token": token,
          },
          body: formData,
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message);
      return body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
