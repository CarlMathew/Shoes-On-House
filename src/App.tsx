import "./App.css"
import Navbar from "./Navbar"
import Body from "./Body"
import Footer from "./Footer"
import Checkout from "./Checkout";
import ShopMore from "./ShopMore";
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
      <Routes>
        <Route
          path="/Shop"
          element={
            <>
              <Navbar contentList={["Home", "Shop More"]} order = {order} linkList = {["/Shop", "/ShopMore"]}/>
              <BackgroundPicture />
              <Body orderData = {order} handleOrder = {handleOrder} clearAll = {clearAll}/>
              <Footer />
            </>
          }
        />
        <Route path="/checkout" element={
          <>
            <Navbar contentList={["Home", "Shop More"]} order = {order} linkList = {["/Shop", "/ShopMore"]}/>
            <Checkout 
              orders = {order}
              handleOrder={handleOrder}
            />
        </>
        } />
        <Route path ="/ShopMore" element = {
          <div className="h-screen">
            <div className="h-[7%]">
                <Navbar contentList={["Home", "Shop More"]} order = {order} linkList = {["/Shop", "/ShopMore"]}/>
            </div>
            <div className="h-[93%]">
                <ShopMore />
            </div>
          </div>



        }/>
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
