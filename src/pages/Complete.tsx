import React from "react";
import { CompleteCSS } from "../style/pages/CompleteCSS";

function Complete() {
  return (
    <CompleteCSS>
      <img
        src={`${process.env.PUBLIC_URL}/img/CheckFilled.webp`}
        alt="CheckFilled"
      />
      <p>주문이 완료되었습니다.</p>
    </CompleteCSS>
  );
}

export default Complete;
