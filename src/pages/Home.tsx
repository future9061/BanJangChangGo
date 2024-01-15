import React from "react";
import { HomeCSS } from "../style/pages/HomeCSS";
import Logo from "../components/Logo";
import Button from "../components/Button";

function Home() {
  return (
    <HomeCSS>
      <Logo size="L" />
      <Button children={"주문하러 가기"} id="link" path="/order" />
    </HomeCSS>
  );
}

export default Home;
