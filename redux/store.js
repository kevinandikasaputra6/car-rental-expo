import { configureStore } from "@reduxjs/toolkit";
import reactotron from "../ReactotronConfig";
import carSlice from "./reducers/car/carSlice";
import carSliceDetail from "./reducers/car/carDetailsSlicing";
import authSlice from "./reducers/auth/authSlice";
import orderSlice from "./reducers/order/orderSlice";

export const store = configureStore({
  reducer: {
    car: carSlice,
    carDetail: carSliceDetail,
    order: orderSlice,
    user: authSlice,
  },

  enhancers: (getDefaultEnhancers) =>
    __DEV__
      ? getDefaultEnhancers().concat(reactotron.createEnhancer())
      : getDefaultEnhancers(),
});
