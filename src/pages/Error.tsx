import React from "react";
import { CompleteCSS } from "../style/pages/CompleteCSS";

function Error() {
  return (
    <CompleteCSS>
      <p>
        주문에 실패하였습니다.
        <br />
        다시 시도해주세요.
      </p>
    </CompleteCSS>
  );
}

export default Error;
