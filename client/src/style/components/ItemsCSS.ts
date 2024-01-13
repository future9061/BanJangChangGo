import styled from "styled-components";

export const ItemsCSS = styled.ul`
  padding: 10px 25px;

  > li {
    cursor: default;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    margin-bottom: 10px;
    display: flex;
    height: 82px;
    padding: 3%;
    gap: 10px;

    > .box {
      width: 62px;
      height: 62px;
      background: #d9d9d9;
      width: 20%;
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 75%;
      justify-content: space-between;

      > .title {
        display: flex;

        > p {
          font-size: 17px;
        }

        > span {
          text-align: center;
          margin-left: 10px;
          padding-top: 2px;
          font-size: 10px;
          width: 50px;
          height: 20px;
          background: #f75a2f;
          color: #fff;
          border-radius: 10px;
        }
      }

      > .price {
        display: flex;
        justify-content: space-between;

        > div {
          display: flex;
          gap: 5px;

          > span {
            cursor: pointer;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            text-align: center;
            line-height: 15px;
            transform: translateY(2px);

            &:hover {
              background: #efefef;
            }
          }
        }
      }
    }
  }
`;
