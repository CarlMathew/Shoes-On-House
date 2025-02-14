import React, { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
 // @ts-expect-error Already install
import 'swiper/css';
 // @ts-expect-error Already install
import 'swiper/css/navigation';
 // @ts-expect-error Already install
import 'swiper/css/pagination';
import "./Checkout.css"
import { CheckOutProps, orderDetails, OrderProps, QuantityButtonProps, RemoveDialogProps, PaymentProps } from "./types";

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
                    <OrdersMobile                      quantity = {quantity} 
                        setQuantity = {setQuantity} 
                        orders ={orders} 
                        openDialog = {openDialog} 
                        setRemoveId = {setRemoveId}
                        handleOrder = {handleOrder}/>
                </div> 
                <div className="w-full lg:w-[25%]">
                    <PaymentDetails orders={orders}/>
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

function PaymentDetails({orders} : PaymentProps):JSX.Element | string | null{

    const [shippingFee, setShippingFee] = useState<number>(2.35);
    const [code, setCode] = useState<string>("")
    const [discount, setDiscount] = useState<number>(0);
    const [country, setCountry] = useState<string>("PH");
    const [showDiscount, setShowDiscount] = useState<boolean>(false);
    const totalPaymentOrder:number = orders.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
    const overallTotal: number = totalPaymentOrder + shippingFee

    function handleShippingFee(e:React.ChangeEvent<HTMLSelectElement>){
        setCountry(e.target.value);

        if (e.target.value === "PH"){
            setShippingFee(2.35)

        } else {
            setShippingFee(4.5)

        }
    }
    // @ts-expect-error e means event handler
    function submitCode(e){
        e.preventDefault()
        setShowDiscount(true)
        if (code === "ASIA123") {
            setDiscount(0.10)
        } 
        else if (code === "SHOESZXC") {
            setDiscount(0.80)
        }
        else {
            setDiscount(0)

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
                        <h1>${totalPaymentOrder.toFixed(2)}</h1> 
                    </div>
                    <hr className = "mt-2 border-slate-950" />
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
                    <hr className = "mt-2 border-slate-950" />
                </div>
                <div className = "p-2 px-4 ">
                    <div className="flex justify-between">
                        <h1>Total</h1>
                        <h1>${(overallTotal - (overallTotal * discount)).toFixed(2)}</h1> 
                    </div>
                    <hr className =  "mt-2 border-slate-950" />
                </div>
                {showDiscount && (
                    <div className={`italic text-sm p-2 px-4 ${discount>0 ? "text-green-400" : "text-red-400"}`}>
                        {discount>0 ? `${discount * 100}% Discount Acquired: Save $${(overallTotal * discount).toFixed(2)}` : "Wrong Code"}
                    </div>
                )}
                <form className="p-2 px-4 flex gap-1" onSubmit={submitCode}>
                    <input type="text" name="" id="" placeholder="Promo code..." className="bg-transparent w-full border-0 border-b-2 focus:outline-none" value={code} onChange={(e) => setCode(e.target.value)}/>
                    <button type="submit" className="border-2 px-4 bg-green-600 text-white">Ok</button>
                </form>
                <div className = "p-2 px-4 flex justify-center mt-2">
                    <button className="px-20 py-1 border-2 rounded-full bg-sky-300 font-bold transition-all duration-200 hover:scale-110 hover:-translate-y-2 ">Checkout</button>
                </div>
            </div>
        </div>
    )   
}

function OrdersMobile({quantity, setQuantity, orders, openDialog, setRemoveId, handleOrder}: OrderProps): JSX.Element | string | null {
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
                {orders.map((data) => (
                    <SwiperSlide>
                        <div className="flex flex-col items-center justify-center relative">    
                            <button className="absolute top-0 right-4 border-2 p-2 bg-red-400 rounded shadow shadow-black"                         
                                onClick={(e) => {
                                openDialog() 
                                setRemoveId(e.currentTarget.getAttribute("data-id"))
                                }} 
                                data-id = {data.id}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                </svg>
                            </button>        
                            <img src={data.imgURL}  alt="" className="w-[150px] h-[150px] rounded-full shadow-lg pt-4 border-2 border-black" />
                            <h1 className="text-xl font-bold">{data.name}</h1>
                            <h1 className="mt-2">Size {data.size}</h1>
                            <h1 className="mt-2">${data.price}</h1>
                            <div className="flex gap-2 mt-2">
                                <h1 className="text-center">Quantity:</h1>
                                <QuantityButton quantity = {quantity} setQuantity = {setQuantity} orders={orders} uid = {data.id} ordersQuantity = {data.quantity} handleOrder = {handleOrder}/>
                            </div>
                            <h1 className="mt-2">Subtotal: ${(data.price * data.quantity).toFixed(2)}</h1>
                        </div>
                    </SwiperSlide>
                ))}


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