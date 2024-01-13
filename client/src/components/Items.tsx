import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ItemsCSS } from "../style/components/ItemsCSS";

function Items() {
  const Items = useSelector((state: RootState) => state.items);

  return (
    <ItemsCSS>
      {Items.map((elem) => {
        const Price = elem.price?.toLocaleString();

        return (
          <li key={elem.id}>
            <div className="box"></div>
            <div className="content">
              <section className="title">
                <p>{elem.name}</p>
                {elem.event ? <span>이벤트</span> : null}
              </section>
              <section className="price">
                <div>
                  <span>-</span>
                  <p>{elem.counter}</p>
                  <span>+</span>
                </div>
                <p>{Price}원</p>
              </section>
            </div>
          </li>
        );
      })}
    </ItemsCSS>
  );
}

export default Items;
