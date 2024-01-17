import React, { useEffect } from "react";
import { CompleteCSS } from "../style/pages/CompleteCSS";
import { useNavigate } from "react-router-dom";

function Complete() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/order");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

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
