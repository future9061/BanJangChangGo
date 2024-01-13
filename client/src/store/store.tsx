import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemsType } from "../types/ItemsType";

const initialState: ItemsType = [
  {
    id: null,
    name: null,
    event: null,
    materialType: null,
    price: null,
    counter: 0,
  },
];

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    getData: (state, action: PayloadAction<ItemsType>) => {
      return action.payload;
    },
    increment: (state) => {},
    decrement: (state) => {},
  },
});

export const { increment, decrement, getData } = itemSlice.actions;

export const store = configureStore({
  reducer: {
    items: itemSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
