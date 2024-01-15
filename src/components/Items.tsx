import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../store/ItemSlice";
import { ItemsCSS } from "../style/components/ItemsCSS";
import { RootState } from "../store/store";

function Items() {
  const Items = useSelector((state: RootState) => state.items);
  const dispatch = useDispatch();

  const PlusCounter = (id: string) => {
    const targetIdx = Items.findIndex((item) => item.id === id);
    dispatch(increment({ idx: targetIdx, id: Items[targetIdx].id }));
  };

  const MinusCounter = (id: string) => {
    const targetIdx = Items.findIndex((item) => item.id === id);
    dispatch(decrement({ idx: targetIdx, id: Items[targetIdx].id }));
  };

  return (
    <ItemsCSS>
      {Items.map((elem) => {
        const Price =
          elem.price &&
          elem.counter &&
          (elem.price * elem.counter).toLocaleString();

        return (
          <li key={elem.id} className={elem.counter !== 0 ? "red" : ""}>
            <div className="box"></div>
            <div className="content">
              <section className="title">
                <p>{elem.name}</p>
                {elem.event ? <span>이벤트</span> : null}
              </section>
              <section className="price">
                <div>
                  <span onClick={() => MinusCounter(elem.id as string)}>-</span>
                  <p>{elem.counter}</p>
                  <span onClick={() => PlusCounter(elem.id as string)}>+</span>
                </div>
                <p>
                  {elem.counter === 0 ? elem.price.toLocaleString() : Price}원
                </p>
              </section>
            </div>
          </li>
        );
      })}
    </ItemsCSS>
  );
}

export default Items;
