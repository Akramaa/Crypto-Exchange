import React from "react";
import { api } from "../App";
import {
  Table,
  Tbody,
  Image,
  Text,
  Tr,
  Td,
  TableContainer,
  HStack,
  VStack,
  Input,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";

function Coins() {
  const [coins, setCoins] = useState([]);
  const [loading, setloading] = useState(true);
  const [currency, setCurrency] = useState("usd");
  const [currencySymbol, setcurrencySymbol] = useState("$");
  const [errorHandle, seterrorHandle] = useState(false);

  useEffect(() => {
    async function fetchingData() {
      try {
        const response = await fetch(
          `${api}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en`
        );
        const coinArray = await response.json();
        setloading(false);
        setCoins(coinArray);
     
      } catch (error) {
        seterrorHandle(true);
        setloading(false);
       
      }
    }
    fetchingData();
    symbolChange();
    // eslint-disable-next-line
  }, [currency]);

  if (errorHandle) return <ErrorComponent />;

  const symbolChange = () => {
    if (currency === "usd") {
      setcurrencySymbol("$");
    } else if (currency === "inr") {
      setcurrencySymbol("₹");
    } else if (currency === "eur") {
      setcurrencySymbol("€");
    }
  };

  return (
    <>
      <VStack
        mt={"5rem"}
        pos={"fixed"}
        w={"full"}
        zIndex={"1"}
        bgColor={"#141425"}
      >
        <HStack>
          <Input
            type={"search"}
            variant={"outline"}
            size={"sm"}
            borderRadius={"6"}
            focusBorderColor={"goldenrod"}
            mt={"8"}
            placeholder=" Search "
            color={"goldenrod"}
          />
          <Select
            placeholder="Currency"
            size={"sm"}
            borderRadius={"6"}
            focusBorderColor={"goldenrod"}
            color={"goldenrod"}
            mt={"8"}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="usd">USD</option>
            <option value="inr">INR</option>
            <option value="eur">EUR</option>
          </Select>
        </HStack>
        <HStack
          justifyContent={"space-between"}
          w={"full"}
          borderBottom={"1px solid white"}
          fontSize={["1rem", "lg"]}
          fontWeight={"semibold"}
        >
          <Text color={"goldenrod"} mx={["6", "4rem"]} mb={"3px"}>
            Coins
          </Text>
          <Text color={"goldenrod"} mx={["6", "4rem"]} mb={"3px"}>
            Changes
          </Text>
        </HStack>
      </VStack>
      <TableContainer w={"full"}>
        <Table variant="simple" mt={"12rem"}>
          <Tbody>
            {loading ? (
              <HStack w={"full"} justifyContent={"center"} p={"8"}>
                <Loading />{" "}
              </HStack>
            ) : (
              coins.map((data) => {
                return (
                  <Tr
                    key={data.id}
                    css={{
                      "&:hover": {
                        backgroundColor: "#141425",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Td>
                      <Link to={`/coin/${data.id}`}>
                        <HStack px={["0", "10"]} w={"8rem"}>
                          <Image
                            src={data.image}
                            w={["8", "10"]}
                            h={["8", "10"]}
                            objectFit={"contain"}
                          />
                          <Text mx={["0", "4"]} fontSize={[".85rem", "1.3rem"]}>
                            {data.name}
                          </Text>
                        </HStack>
                      </Link>
                    </Td>
                    <Td>
                      <Link to={`/coin/${data.id}`}>
                        <VStack
                          alignItems={"flex-end"}
                          px={["0", "10"]}
                          spacing={["0", "4"]}
                          fontSize={[".8rem", "1.3rem"]}
                        >
                          <Text>
                            {currencySymbol} {data.current_price}
                          </Text>
                          <Text
                            color={
                              data.price_change_percentage_24h < 0
                                ? "red"
                                : "green"
                            }
                          >
                            {data.price_change_percentage_24h}%
                          </Text>
                        </VStack>
                      </Link>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Coins;
