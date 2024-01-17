import React, { useEffect } from "react";
import { CompleteCSS } from "../style/pages/CompleteCSS";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/order");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

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
