import React from "react";
import Header from "../components/Header";
import { OrderCSS } from "../style/pages/OrderCSS";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ItemsType } from "../types/ItemsType";
import Items from "../components/Items";
import OrderSheet from "../components/OrderSheet";
import FetchItems from "../apis/FetchItems";

function Order() {
  const { isLoading } = useQuery<ItemsType, AxiosError>(
    "itemsKey",
    FetchItems(),
    {
      refetchOnWindowFocus: false,
    }
  );

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
      <OrderSheet loading={isLoading} />
    </OrderCSS>
  );
}

export default Order;
