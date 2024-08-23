import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import categoryReducer from "../features/categorySlice";
import brandsReducer from "../features/brandSlice";
import userReducer from "../features/userSlice";
import inventoryReducer from "../features/inventorySlice";
import orderReducer from "../features/orderSlice";
import mailReducer from "../features/mailSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    categories: categoryReducer,
    brands: brandsReducer,
    users: userReducer,
    inventory: inventoryReducer,
    orders: orderReducer,
    mails: mailReducer,
  },
});
