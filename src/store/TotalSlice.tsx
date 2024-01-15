import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  totalCouter: 0,
  totalPrice: 0,
};

export const totalSlice = createSlice({
  name: "total",
  initialState,
  reducers: {
    TotalCounter: (state, action: PayloadAction<{ counter: number }>) => {
      const { counter } = action.payload;
      state.totalCouter = counter;
    },
    TotalPrice: (state, action: PayloadAction<{ price: number }>) => {
      const { price } = action.payload;
      state.totalPrice = price;
    },
  },
});

export const { TotalCounter, TotalPrice } = totalSlice.actions;
