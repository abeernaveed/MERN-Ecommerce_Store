import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import categoryReducer from "../features/categorySlice";
import userReducer from "../features/userSlice";
import cartReducer from "../features/cartSlice";
import checkoutReducer from "../features/checkoutSlice";
import messageReducer from "../features/messageSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    message: messageReducer,
  },
});
