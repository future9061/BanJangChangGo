import React from "react";
import Header from "../components/Header";
import { OrderCSS } from "../style/pages/OrderCSS";
import axios, { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ItemType, ItemsType } from "../types/ItemsType";
import { useDispatch } from "react-redux";
import { getData } from "../store/store";
import Items from "../components/Items";
import OrderSheet from "../components/OrderSheet";

function Order() {
  const dispatch = useDispatch();

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:3001/items ");
      const data = res.data.map((n: ItemType) => {
        n.counter = 0;
        return n;
      });
      dispatch(getData(data));
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const { isLoading } = useQuery<ItemsType, AxiosError>("itemsKey", fetchItems);

  const Waiting = () => (
    <div className="waiting">
      <p>
        목록을
        <br /> 불러오고 있습니다
      </p>
    </div>
  );

  return (
    <OrderCSS>
      <Header />
      {isLoading ? Waiting() : <Items />}
      <OrderSheet />
    </OrderCSS>
  );
}

export default Order;
