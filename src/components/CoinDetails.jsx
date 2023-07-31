import {
    HStack,
    Text,
    Box,
    VStack,
    Container,
    Image,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Badge,
    Progress,
    Select,
    Button,
  } from "@chakra-ui/react";
  import React from "react";
  import Loading from "./Loading";
  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { api } from "../App";
  import ErrorComponent from "./ErrorComponent";
  import  Chart from "./Chart";
  import Footer from "./Footer";
  
  function CoinDetails() {
    const [coins, setCoins] = useState([]);
    const [loading, setloading] = useState(true);
    const [currency, setCurrency] = useState("usd");
    const [currencySymbol, setcurrencySymbol] = useState("$");
    const [errorHandle, seterrorHandle] = useState(false);
    const [days, setdays] = useState("24h")
    const [chartArry, setchartArray] = useState([])
  
    const params = useParams();
  
    
    const btns = ['24h', '7D', '14D', '1M', '3M', '6M', '1Y', 'max'];
    const switchChartstat = (key) =>{
     switch (key) {
        case '24h':
        setdays('24h');
        setloading(true);
        break;
        case '7D':
        setdays('7d');
        setloading(true);
        break;
        case '14D':
        setdays('14d');
        setloading(true);
        break;
        case '1M':
        setdays('30d');
        setloading(true);
        break;
        case '3M':
        setdays('90d');
        setloading(true);
        break;
        case '6M':
        setdays('180d');
        setloading(true);
        break;
        case '1Y':
        setdays('365d');
        setloading(true);
        break;
        case 'max':
        setdays('max');
        setloading(true);
        break;   
      default:
        case '24h':
        setdays('24h');
        break;
     }
    }
  
  
    useEffect(() => {
      async function fetchingCoin() {
        try {
          const response = await fetch(`${api}/coins/${params.id}`);
          const coinArray = await response.json();
  
          const chart = await fetch(`${api}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
          const chartData = await chart.json(); 
  
          setloading(false);
          setchartArray(chartData.prices)
          setCoins(coinArray);
          console.log( chartArry)
        } catch (error) {
          seterrorHandle(true);
          setloading(false);
        }
      }
      symbolChange();
      fetchingCoin();
     
      // eslint-disable-next-line
    }, [params.id, currency, days]);
  
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
      <Container maxW={"container.xl"} mt={'6rem'} h={['150vh','90rem']}>
        {loading ? (
          <HStack mt={"7rem"} w={"full"} justifyContent={"center"}>
            <Loading /> 
          </HStack>
        ) : (
          <>
            <Box w={"full"} borderWidth={"1"}>
              <Chart arr={chartArry} currency={currencySymbol} days={days}/>
             <HStack p={'4'}  overflowX={'auto'}>
              {
                btns.map( (btn, index) =>(
                  <Button key={index} onClick={()=> switchChartstat(btn)}>{btn}</Button>
                ))
              }
             </HStack>
            </Box>
            <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
              <Text opacity={".5"} fontSize={"small"} alignSelf={"center"}>
                Last Updated On {" - "}
                {Date(coins.market_data.last_update).split("G")[0]}
              </Text>
              <HStack w={"full"} justifyContent={"space-between"}>
                <Image
                  src={coins.image.large}
                  w={"16"}
                  h={"16"}
                  objectFit={"contain"}
                />
                <Select
                  placeholder="Currency"
                  size={"sm"}
                  borderRadius={"6"}
                  focusBorderColor={"goldenrod"}
                  color={"goldenrod"}
                  w={"25"}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="usd">USD</option>
                  <option value="inr">INR</option>
                  <option value="eur">EUR</option>
                </Select>
              </HStack>
  
              <Stat>
                <StatLabel>{coins.name}</StatLabel>
                <StatNumber>
                  {currencySymbol}
                  {coins.market_data.current_price[currency]}
                </StatNumber>
                <StatHelpText>
                  <StatArrow
                    type={
                      coins.market_data.price_change_percentage_24h.toFixed(3) > 0
                        ? "increase"
                        : "decrease"
                    }
                  />
                  {coins.market_data.price_change_percentage_24h.toFixed(3)}%
                </StatHelpText>
              </Stat>
              <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"}>
                {`#${coins.market_data.market_cap_rank}`}
              </Badge>
              <CustomBar
                high={`${currencySymbol}${coins.market_data.high_24h[currency]}`}
                low={`${currencySymbol}${coins.market_data.low_24h[currency]}`}
              />
              <Box w={"full"} p={"4"}>
                <Item title={"Max Supply"} value={coins.market_data.max_supply} />
                <Item
                  title={"Circulating Supply"}
                  value={coins.market_data.circulating_supply}
                />
                <Item
                  title={"Market Cap"}
                  value={coins.market_data.market_cap[currency]}
                />
                <Item
                  title={"All Time High"}
                  value={coins.market_data.ath[currency]}
                />
                <Item
                  title={"All Time High"}
                  value={coins.market_data.atl[currency]}
                />
              </Box>
            </VStack>
          </>
        )}
      </Container>
      <Footer/>
      </>
    );
  }
  
  const Item = ({ title, value }) => (
    <HStack justifyContent={"space-between"} w={"full"} my={["3px", "4"]}>
      <Text
        fontFamily={"sans-serif"}
        letterSpacing={"widest"}
        fontSize={[".8rem", "1.3rem"]}
      >
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );
  const CustomBar = ({ high, low }) => (
    <VStack w={"full"}>
      <Progress value={"50"} colorScheme="teal" w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme="red" />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>
    </VStack>
  );
  
  export default CoinDetails;
  