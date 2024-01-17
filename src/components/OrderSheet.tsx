import React, { useEffect } from "react";
import { OrderSheetCSS } from "../style/components/OrderSheetCSS";
import Button from "./Button";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { TotalCounter, TotalPrice } from "../store/TotalSlice";
import FetchOrder from "../apis/FetchOrder";

function OrderSheet({ loading }: { loading: boolean }) {
  const Items = useSelector((state: RootState) => state.items);
  const total = useSelector((state: RootState) => state.total);
  const dispatch = useDispatch();

  const totalCouter = Items.reduce(
    (a, c) => {
      return { counter: a.counter + c.counter };
    },
    { counter: 0 }
  );

  const totalPrice = Items.reduce(
    (a, c) => {
      return { price: a.price + c.price * c.counter, counter: 1 };
    },
    { price: 0, counter: 1 }
  );

  console.log(totalPrice);

  useEffect(() => {
    dispatch(TotalCounter({ counter: totalCouter.counter }));
    dispatch(TotalPrice({ price: totalPrice.price }));
  }, [totalCouter, totalPrice]);

  const { handleSubmit, isLoading } = FetchOrder();

  return (
    <OrderSheetCSS>
      <div>
        <p>
          총 수량 : <span>{total.totalCouter}개</span>
        </p>
        <p>
          총 가격 : <span>{total.totalPrice.toLocaleString()}원</span>
        </p>
      </div>
      <Button
        children={isLoading ? "로딩 중..." : "주문하기"}
        id="submit"
        className={loading || isLoading ? "gray" : ""}
        onClick={() =>
          total.totalCouter !== 0
            ? handleSubmit(total)
            : alert("상품 수량이 0입니다.")
        }
      />
    </OrderSheetCSS>
  );
}

export default React.memo(OrderSheet);
