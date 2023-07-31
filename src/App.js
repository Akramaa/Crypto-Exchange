import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchange from "./components/Exchange";
import Coins from "./components/Coins";
import CoinDetails from "./components/CoinDetails";

function App() {
  return (
    <>
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/exchange" element={<Exchange/>}/>
        <Route path="/coins" element={<Coins/>}/>
        <Route path="/coin/:id" element={<CoinDetails/>}/>
       
      </Routes>

    </Router>
    </>
  );
}
export const  api = "https://api.coingecko.com/api/v3"
export default App;
