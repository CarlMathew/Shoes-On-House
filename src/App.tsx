import "./App.css"
import Navbar from "./Navbar"
import Body from "./Body"
import Footer from "./Footer"
import Checkout from "./Checkout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { orderDetails } from "./types";




function App(): JSX.Element | null | string {
  

  const [order, setOrder] = useState<orderDetails[]>([])

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    setOrder(storedOrders)
  }, [])

  const handleOrder = (updateOrders: orderDetails[]) => {
    setOrder(updateOrders);
    localStorage.setItem("orders", JSON.stringify(updateOrders))
  }

  const clearAll = () => {
    setOrder([])
    localStorage.removeItem("orders")
    console.log("all clear")
  }


  return (
    <Router>
      <Navbar contentList={["Home", "About", "Shop More"]} order = {order} linkList = {["/Shop", "/", "/"]}/>
      <Routes>
        <Route
          path="/Shop"
          element={
            <>
              <BackgroundPicture />
              <Body orderData = {order} handleOrder = {handleOrder} clearAll = {clearAll}/>
              <Footer />
            </>
          }
        />
        <Route path="/checkout" element={
          <Checkout 
            orders = {order}
            handleOrder={handleOrder}
        />} />
      </Routes>
    </Router>
  );
}


function BackgroundPicture(): JSX.Element | null | string {
  return (
    <div id="BgPic" className="h-screen flex justify-around gap-44 items-center">
      <div className="w-ful md:w-4/6 ">
        <h1 className="font-black text-[3rem] md:text-[6rem] text-center  text-white">Step Into Comfort,</h1>
        <h1 className="font-black text-[3rem] md:text-[7rem] drop-shadow-2xl  text-center  text-slate-800">Walk</h1>
        <h1 className="font-black text-[3rem] md:text-[6rem] text-center  text-white">With Confidence!</h1>
      </div>
    </div>
  )
}

export default App
