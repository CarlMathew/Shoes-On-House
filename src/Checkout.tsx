import React, { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Checkout.css"
import { CheckOutProps, orderDetails, OrderProps, QuantityButtonProps, RemoveDialogProps } from "./types";

export default function Checkout({orders, handleOrder} :CheckOutProps): JSX.Element | string | null {
    const [quantity, setQuantity] = useState<number>(1);
    const removeDialog = useRef<HTMLDialogElement>(null)
    const [removeId, setRemoveId] = useState<number | string | null>(0);

    const openDialog = () => {
        removeDialog.current?.showModal()
      
    }
    const closeModal = () => {
        removeDialog.current?.close()
    }
    return (
        <div className = "px-10 p-5">
            <RemoveDialog 
                dialogRef = {removeDialog}  
                closeModal = {closeModal} 
                removeId = {removeId}  
                orders = {orders}
                handleOrder={handleOrder}
                
            />
            <h1 className="text-6xl font-bold mt-20 md:mt-5">YOUR CART</h1>
            <div className="flex flex-col lg:flex-row gap-5 mt-10 md:mt-16">
                <div className="w-[75%] hidden lg:block">
                    <Orders 
                        quantity = {quantity} 
                        setQuantity = {setQuantity} 
                        orders ={orders} 
                        openDialog = {openDialog} 
                        setRemoveId = {setRemoveId}
                        handleOrder = {handleOrder}
                
        
                    />
                </div>
                <div className="w-full block lg:hidden">
                    <OrdersMobile quantity = {quantity} setQuantity = {setQuantity} orders={orders}/>
                </div> 
                <div className="w-full lg:w-[25%]">
                    <PaymentDetails />
                </div>

            </div>
        </div>
    )
}



function RemoveDialog({dialogRef, closeModal, removeId, orders, handleOrder}: RemoveDialogProps): JSX.Element | null | string {
    const productName: orderDetails | null = orders.filter((data) => data.id == removeId)[0] 
    function RemoveItem(){

        const remainingOrders: orderDetails[] = orders.filter(data => data.id != removeId)
        handleOrder(remainingOrders)
        closeModal()
    }
    return (
        <dialog className="p-6 rounded-2xl shadow-xl" ref = {dialogRef}> 
            
            <h1 className="font-bold text-xl">Remove {productName ?  productName.name : ""} from your cart?</h1>
            <div className="flex mt-6 items-center justify-center gap-20">
                <button className="px-4 bg-red-600 text-white font-bold rounded text-xl transition-transform duration-150 hover:scale-110 active:scale-75" onClick={RemoveItem}>Yes</button>
                <button className="px-4 bg-green-600 text-white font-bold rounded text-xl transition-transform duration-150 hover:scale-110 active:scale-75" onClick={closeModal}>No</button>
            </div>
        </dialog>
    )
}

function Orders({quantity, setQuantity, orders, openDialog, setRemoveId, handleOrder}: OrderProps): JSX.Element | string | null {



    return (
    <div className="w-full tableContent">
        <div className="column flex border-b-2">
            <h1 className="w-[40%]">Product</h1>
            <h1 className="w-[20%]">Price</h1>
            <h1 className="w-[20%]">Quantity</h1>
            <h1 className="w-[10%]">Subtotal</h1>
        </div>
        <div className="row mt-2">
            {orders.map((data) => (
                <>
                <div className="flex w-full">
                    <div className="flex w-[40%]">
                        <img src={data.imgURL} alt="" className="w-[150px] h-[150px] mt-1" />
                        <div className="mt-6">
                            <h1 className="font-bold">{data.name}</h1>
                            <h1 className="mt-2">Size {data.size}</h1>
                        </div>
                    </div>
                    <h1 className="flex w-[20%] text-xl mt-6">${data.price}</h1>
   
                    <QuantityButton quantity = {quantity} setQuantity = {setQuantity} orders={orders} uid = {data.id} ordersQuantity = {data.quantity} handleOrder = {handleOrder}/>
                    <h1 className="flex w-[10%] text-xl mt-6">${(data.price * data.quantity).toFixed(2)}</h1>
                    <div className="w-[10%] flex items-end justify-end">
                        <button className="rounded-full border-red-500 border-2 px-4 transition-all duration-200 hover:scale-110 hover:bg-red-500 hover:text-white hover:shadow-lg" 
                        onClick={(e) => {
                            openDialog() 
                            setRemoveId(e.currentTarget.getAttribute("data-id"))
                        }} 
                        data-id = {data.id}>Remove</button>
                    </div>
                    
                </div>
                <hr className="mt-4"/>
                </>
            ))}

        </div>
    </div>
    )
}

function PaymentDetails():JSX.Element | string | null{

    const [shippingFee, setShippingFee] = useState<number>(2.35);
    const [country, setCountry] = useState<string>("PH");
    

    function handleShippingFee(e:React.ChangeEvent<HTMLSelectElement>){
        setCountry(e.target.value);

        if (e.target.value === "PH"){
            setShippingFee(2.35)
        } else {
            setShippingFee(4.5)
        }
    }

    return (
        <div className="quantity w-full">
            <div className="shadow-xl rounded-lg pb-10 ">
                <div className="bg-slate-950 text-white p-2 px-4">
                    <h1>$5 Flat Rate Shipping</h1>
                </div>
                <div className="p-2 mt-4 px-4">
                    <h1 className="font-bold text-xl">CART TOTALS</h1>
                    <hr className =  "mt-2 border-slate-950" />
                </div>
                <div> </div>
                <div className = "p-2 px-4 ">
                    <div className="flex justify-between">
                        <h1>Subtotals</h1>
                        <h1>Total</h1> 
                    </div>
                    <hr className =  "mt-2 border-slate-950" />
                </div>
                <div className = "p-2 px-4 ">
                    <div className="flex justify-between">
                        <h1>Shipping</h1>
                        <div>
                            <select name="" id=""  onChange={handleShippingFee} value = {country}>
                                <option value = "PH">Philippines</option>
                                <option value = "US">USA</option>
                            </select> 
                            <h1 className="mt-2 text-end">${shippingFee}</h1>
                        </div>
                    </div>
                    <hr className =  "mt-2 border-slate-950" />
                </div>
                <div className = "p-2 px-4 ">
                    <div className="flex justify-between">
                        <h1>Total</h1>
                        <h1>Total</h1> 
                    </div>
                    <hr className =  "mt-2 border-slate-950" />
                </div>
                <div className = "p-2 px-4 flex justify-center mt-2">
                    <button className="px-20 py-1 border-2 rounded-full bg-sky-300 font-bold transition-all duration-200 hover:scale-110 hover:-translate-y-2 ">Checkout</button>
                </div>
            </div>
        </div>
    )   
}

function OrdersMobile({quantity, setQuantity}: QuantityButtonProps): JSX.Element | string | null {
    return (
        <div className="pt-4 shadow border-slate-950 border-2 rounded-lg pb-4">
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                pagination={false}
                navigation={{
                    prevEl: ".prev-button",
                    nextEl: ".next-button"
                }}
                modules={[Pagination, Navigation]}
            >
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center">            
                        <img src="public/popular/sample_shoes.png" alt="" className="w-[150px] h-[150px] rounded-full shadow-lg pt-4 border-2 border-black" />
                        <h1 className="text-xl font-bold">Stride X</h1>
                        <h1 className="mt-2">Size: 10</h1>
                        <h1 className="mt-2">Price: $15.99</h1>
                        <div className="flex gap-2 mt-2">
                            <h1 className="text-center">Quantity:</h1>
                            <QuantityButton quantity={quantity} setQuantity={setQuantity} />
                        </div>
                        <h1 className="mt-2">Subtotal</h1>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="flex flex-col items-center justify-center">            
                        <img src="public/popular/sample_shoes2.png" alt="" className="w-[150px] h-[150px] rounded-full shadow-lg pt-4 border-2 border-black" />
                        <h1 className="text-xl font-bold">Stride X</h1>
                        <h1 className="mt-2">Size: 10</h1>
                        <h1 className="">Price: $15.99</h1>
                        <div className="flex gap-2">
                            <h1 className="text-center">Quantity:</h1>
                            <QuantityButton quantity={quantity} setQuantity={setQuantity}/>
                        </div>
                        <h1>Subtotal</h1>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div className="absolute top-[55%]  left-2 prev-button cursor-pointer text-xl bg-black px-2 rounded-full text-white transition-all duration-150 active:scale-50">{"<"}</div>
            <div className="absolute top-[55%]  right-2 next-button cursor-pointer text-xl bg-black px-2 rounded-full text-white transition-all duration-150 active:scale-50 ">{">"}</div>
        </div>
    )
}

function QuantityButton({ordersQuantity, uid, orders, handleOrder}: QuantityButtonProps): JSX.Element | string | null {
    function minusQuantity (){
        const quantityAdd:orderDetails[] = orders.map(data => data.id == uid ? {...data, quantity: data.quantity > 1 ? data.quantity - 1 : 1} : data )
        handleOrder(quantityAdd)
    }

    function addQuantity(){
        const quantityAdd:orderDetails[] = orders.map(data => data.id == uid ? {...data, quantity: data.quantity + 1} : data )

        handleOrder(quantityAdd)
   
    }

    return (
        <div className="flex w-[20%] gap-1">
        <div className="md:mt-6">
            <button className="transition-all duration-75 active:scale-75 font-bold px-2 rounded border-2" onClick={minusQuantity}>-</button>    
        </div>
        <div>
            <h1 className=" md:mt-6 px-4 border-2">{ordersQuantity}</h1>
        </div>
        <div className="md:mt-6">
            <button className="transition-all duration-75 active:scale-75 font-bold px-2 rounded border-2" onClick={addQuantity}>+</button>    
        </div>
    </div>
    )
}