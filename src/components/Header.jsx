import { Button, HStack, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";

function Header() {
  return (
    <HStack
      w={"full"}
      h={"20"}
      p={"4"}
      bgColor={"black"}
      color={"whiteAlpha.900"}
      pos={"fixed"}
      top={"0"}
      left={"0"}
      zIndex={1}
    >
      <Heading
        color={"goldenrod"}
        letterSpacing={[".1rem", ".3rem"]}
        fontSize={["1.7rem", "3rem"]}
      >
        TradeX
      </Heading>
      <HStack>
        <Button
          variant={"unstyled"}
          fontSize={[".8rem", "1.3rem"]}
          mx={["2px", "3"]}
        >
          <Link to={"/"}>Home</Link>
        </Button>
        <Button
          variant={"unstyled"}
          fontSize={[".8rem", "1.3rem"]}
          mx={["2px", "3"]}
        >
          <Link to={"/exchange"}>Exchange</Link>
        </Button>
        <Button
          variant={"unstyled"}
          fontSize={[".8rem", "1.3rem"]}
          mx={["2px", "3"]}
        >
          <Link to={"/coins"}>Coins</Link>
        </Button>
      </HStack>
    </HStack>
  );
}

export default Header;