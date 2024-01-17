import React, { useEffect } from "react";
import axios from "axios";
import { TotalDataType } from "../types/TotalDataType";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";

function FetchOrder() {
  const navigate = useNavigate();

  const fetchOrder = async (data: TotalDataType) => {
    try {
      const res = await axios.post("http://localhost:3001/ordersheet", data);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const { mutateAsync, isSuccess, isError, isLoading } =
    useMutation(fetchOrder);

  const handleSubmit = async (total: TotalDataType) => {
    try {
      await mutateAsync(total);
      console.log("주문하기 통신 성공!");
    } catch (error) {
      console.log("주문하기 통신 실패", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/complate");
    }

    if (isError) {
      navigate("/error");
    }
  }, [isSuccess, isError, isLoading]);

  return { handleSubmit, isLoading };
}

export default FetchOrder;
