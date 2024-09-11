import { createAsyncThunk } from "@reduxjs/toolkit";

export const POST_login = createAsyncThunk(
  "POST_login",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://api-car-rental.binaracademy.org/customer/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const body = await res?.json();
      if (!res.ok) throw new Error(body.message || "Something Went Wrong");
      return body;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// export const POST_login = createAsyncThunk(
//   "POST_login",
//   async (formData, { rejectWithValue }) => {
//     // fungsu rejectwitvalue mengirim error ke bagian builder thunk
//     try {
//       if (!formData.email || !formData.password) {
//         throw new Error("Email and Password cannot be empty");
//       } else {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//           throw new Error("Email is not valid");
//         }
//       }
//       const res = await fetch(
//         "https://api-car-rental.binaracademy.org/customer/auth/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formData.email,
//             password: formData.password,
//           }),
//         }
//       );

//       const body = await res?.json();

//       if (!res.ok) {
//         //(!body.access_token)
//         throw new Error(body.message || "Something Went Wrong");
//       }
//       return body;
//     } catch (error) {
//       console.log("AUTH API");
//       console.log(error);

//       return rejectWithValue(error.message);
//     }
//   }
// );
