import { configureStore } from "@reduxjs/toolkit";
import { itemSlice } from "./ItemSlice";
import { totalSlice } from "./TotalSlice";

export const store = configureStore({
  reducer: {
    items: itemSlice.reducer,
    total: totalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
