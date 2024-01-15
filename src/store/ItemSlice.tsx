import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ItemsType } from "../types/ItemsType";

const initialState: ItemsType = [
  {
    id: "",
    name: "",
    event: 0,
    materialType: 0,
    price: 0,
    counter: 0,
  },
];

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    getData: (_, action: PayloadAction<ItemsType>) => {
      return action.payload;
    },
    increment: (state, action: PayloadAction<{ idx: number; id: string }>) => {
      const { id, idx } = action.payload;
      const targetItem = state[idx];

      if (targetItem && targetItem.id === id) {
        if (targetItem.counter < 999) {
          targetItem.counter += 1;
        }
      }
    },
    decrement: (state, action: PayloadAction<{ idx: number; id: string }>) => {
      const { id, idx } = action.payload;
      const targetItem = state[idx];

      if (targetItem && targetItem.id === id) {
        if (targetItem.counter > 0) {
          targetItem.counter -= 1;
        }
      }
    },
  },
});

export const { increment, decrement, getData } = itemSlice.actions;
