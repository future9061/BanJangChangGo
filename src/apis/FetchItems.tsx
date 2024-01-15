import React, { useEffect } from "react";

import axios from "axios";

import { ItemType } from "../types/ItemsType";
import { useDispatch } from "react-redux";
import { getData } from "../store/ItemSlice";

const fetchItems = async () => {
  try {
    const res = await axios.get("http://localhost:3001/items ");
    res.data.map((n: ItemType) => {
      n.counter = 0;
      return n;
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

function FetchItems() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchItems();
        dispatch(getData(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return fetchItems;
}

export default FetchItems;
