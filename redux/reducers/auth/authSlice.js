import { createSlice } from "@reduxjs/toolkit";
import { POST_login } from "./authAPI";
import * as SecureStore from "expo-secure-store";

const getStore = () => JSON.parse(SecureStore.getItem("user") || "{}");
const setStore = (value) => SecureStore.setItem("user", JSON.stringify(value));

const loginSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    dataLogin: getStore() ? getStore() : {},
    isModalVisible: false,
    isLogin: getStore() ? true : false,
    isError: false,
    errorMessage: null,
  },
  reducers: {
    closeModal: (state) => {
      state.isModalVisible = false;
      state.isError = false;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.isLogin = false;
      state.dataLogin = {};
      SecureStore.deleteItemAsync("user");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(POST_login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(POST_login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      setStore(action.payload);
      state.dataLogin = action.payload;
      state.isModalVisible = true;
    });
    builder.addCase(POST_login.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = action.payload;
      state.isModalVisible = true;
    });
  },
});

export { POST_login };
export const { closeModal, logout } = loginSlice.actions;
export const selectUser = (state) => state.user;
export default loginSlice.reducer;
