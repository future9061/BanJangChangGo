import styled, { css } from "styled-components";

export const ButtonCSS = styled.button`
  ${(props) =>
    props.id === "link" &&
    css`
      background: #fff;
      height: 80px;
      border-radius: 20px;
      font-size: 25px;
      text-wrap: nowrap;
      line-height: 30px;
      transition: 0.2s;

      > a {
        height: 100%;
        padding: 20px 10px;
      }
      &:hover {
        background: #dadada;
      }
    `}
`;
