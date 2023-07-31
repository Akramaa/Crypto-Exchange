import React from "react";
import { Spinner } from "@chakra-ui/react";

function Loading() {
  return (
    <Spinner
      color="whiteAlpha.900"
      size={"xl"}
      thickness={"4px"}
      speed="0.65s"
      emptyColor="whiteAlpha.100"
    />
  );
}

export default Loading;
