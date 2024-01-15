import React from "react";
import { LogoCSS } from "../style/components/LogoCSS";
import { LogoProps } from "../types/LogoProps";
import { useNavigate } from "react-router-dom";

function Logo({ size = "S" }: LogoProps) {
  const navigate = useNavigate();

  return (
    <LogoCSS onClick={() => navigate("/")}>
      {size === "L" ? (
        <img
          src={`${process.env.PUBLIC_URL}/img/L-logo-black.webp`}
          alt="큰 로고"
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/img/S-logo-black.webp`}
          alt="작은 로고"
        />
      )}
    </LogoCSS>
  );
}

export default React.memo(Logo);
