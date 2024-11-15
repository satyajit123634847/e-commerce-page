import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import projectsReducer from "./projectsSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
