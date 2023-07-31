import { HStack, Heading, Text, VStack, Image } from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import { api } from "../App";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";



function Exchange() {
  const [exchangesData, setexchangesData] = useState([]);
  const [loading, setloading] = useState(true);
  const [errorHandle, seterrorHandle] = useState(false);

  useEffect(() => {
    async function fetchingData() {
      try {
        const response = await fetch(`${api}/exchanges`);
        const exchanges = await response.json();
        setloading(false);
        setexchangesData(exchanges);
      } catch (error) {
        seterrorHandle(true);
        setloading(false);
      }
    }

    fetchingData();
  }, []);

  if (errorHandle) return <ErrorComponent />;

  return (
    <>
    <HStack wrap={"wrap"} justifyContent={"center"} p={"5"} mt={"8rem"}>
   
      {loading ? (
        <Loading />
      ) : (
        exchangesData.map((data) => {
          return (
            <a href={data.url} target={"blank"} key={data.id}>
              <VStack
                w={"52"}
                shadow={"dark-lg"}
                p={"8"}
                borderRadius={"lg"}
                m={"4"}
                bgColor={"navy-Blue"}
                transition={"all .2s ease-in"}
                css={{
                  "&:hover": {
                    transform: "scale(1.1)",
                    // border: "2px solid goldenrod ",
                  },
                }}
              >
                <Image
                  src={data.image}
                  w={"12"}
                  h={"12"}
                  objectFit={"contain"}
                />
                <Heading fontSize={"1.1rem"}>{data.name.slice(0, 13)}</Heading>
                <Text>Rank - {data.trust_score_rank}</Text>
              </VStack>
            </a>
          );
        })
      )}
    </HStack>
    </>
  );
}

export default Exchange;
