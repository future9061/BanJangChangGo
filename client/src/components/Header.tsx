import React from "react";
import { HeaderCSS } from "../style/components/HeaderCSS";
import Logo from "./Logo";

function Header() {
  return (
    <HeaderCSS>
      <Logo />
    </HeaderCSS>
  );
}

export default Header;
