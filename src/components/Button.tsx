import React from "react";
import { ButtonCSS } from "../style/components/ButtonCSS";
import { ButtonProps } from "../types/ButtonProps";
import { Link } from "react-router-dom";

function Button({ children, id, path, className, onClick }: ButtonProps) {
  const submitBtn = (
    <ButtonCSS id={id} className={className} onClick={onClick}>
      {children}
    </ButtonCSS>
  );

  const linkBtn = (
    <ButtonCSS id={id}>
      <Link to={path!}>{children}</Link>
    </ButtonCSS>
  );

  return id === "link" ? linkBtn : submitBtn;
}

export default React.memo(Button);
