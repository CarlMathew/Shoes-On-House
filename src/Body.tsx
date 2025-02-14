import Logo from "./assets/logo.png"
import "./Body.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
 // @ts-expect-error Already install
import 'swiper/css';
  // @ts-expect-error Already install
import 'swiper/css/navigation';
 // @ts-expect-error Already install
import 'swiper/css/pagination';
import { detailsInterface, shopListInterface,
         descriptionInterface, sliderDetails, 
         BodyProps, DialogProps, 
         orderDetails} from "./types";









const popularData: detailsInterface[] =
    [
        {
            id: 1,
            name: "StrideX",
            imgURL: "/popular/sample_shoes.png",
            price: 102.99
        },
        {
            id: 2,
            name: "SoleCraft",
            imgURL: "/popular/sample_shoes2.png",
            price: 111.15
        },
        {
            id: 3,
            name: "TrailTread",
            imgURL: "/popular/sample_shoes3.png",
            price: 121.55
        },
        {
            id: 4,
            name: "FlexiStep",
            imgURL: "/popular/sample_shoes4.png",
            price: 200.24
        },
        {
            id: 5,
            name: "UrbanSoles",
            imgURL: "/popular/sample_shoes5.png",
            price: 80.99
        }
    ]


const newData: detailsInterface[] = [
    {
        id: 6,
        name: "RapidTrail",
        imgURL: "/new/new_shoes1.png",
        price: 100.50
    },
    {
        id: 7,
        name: "DynamicStride",
        imgURL: "/new/new_shoes2.png",
        price: 220.55
    },
    {
        id: 8,
        name: "CloudTread",
        imgURL: "/new/new_shoes3.png",
        price: 105.99
    },
    {
        id: 9,
        name: "TerrainFlow",
        imgURL: "/new/new_shoes4.png",
        price: 112.22
    },
    {
        id: 10,
        name: "VelocityVibe",
        imgURL: "/new/new_shoes5.png",
        price:304.55
    }

]

const greatestData: descriptionInterface[] = [
    {
        id: 1,
        name: "Play With Style",
        imgURL: "/greatest_picture/badminton.jpg"
    },
    {
        id: 2,
        name: "Rain Or Shine",
        imgURL: "/greatest_picture/basketball.jpg"

    },
    {
        id: 3,
        name: "Shoes On The Go",
        imgURL: "/greatest_picture/wearing_shoes.jpg"

    },
    {
        id: 4,
        name: "New Product: Jacket4z",
        imgURL: "/greatest_picture/model.jpg"

    },

]

const shopList: shopListInterface[] = [
    {
        id: 1,
        name: "Popular",
        click: true,
        data: popularData,
        description: "Popular Today"
    },
    {
        id: 2,
        name: "New",
        click: false,
        data: newData,
        description: "New Release Product"

    },
    {
        id: 3,
        name: "Men's",
        click: false,
        data: null
    },
    {
        id: 4,
        name: "Women's",
        click: false,
        data: null
    },
    {
        id: 5,
        name: "Kid's",
        click: false,
        data: null
    }
]

const description: descriptionInterface[] = [
    {
        id: 1,
        name: "Built to Last",
        imgURL: "/quality/shield.png",
        description: "Crafted with top-tier materials, our shoes are designed to withstand everyday wear and tear, ensuring long-lasting performance",
        
    },
    {
        id:2, 
        name: "Unmatched Comfort",
        imgURL: "/quality/comfort.png",
        description: "Experience all-day comfort with superior cushioning, arch support, and a perfect fit that feels like they were made just for you."
    },
    {
        id:3,
        name: "Stylish Designs",
        imgURL: "/quality/eyeglasses.png",
        description: "Modern, sleek, and versatile—our shoes are perfect for any occasion, whether it’s casual, formal, or activewear."
    },
    {
        id: 4,
        name: "Lightweight Design",
        imgURL: "/quality/feather.png",
        description: "Move freely with shoes that are light as a feather but tough enough to handle your busy lifestyle."
    }
]


const sports:descriptionInterface[] = [
    {
        id: 1,
        name: "Football",
        imgURL: "/sports/football.png"
    },
    {
        id:2,
        name: "Basketball",
        imgURL: "/sports/basketball.png"
    },
    {
        id:3,
        name: "Running",
        imgURL: "/sports/running.jpg"
    },
    {
        id:4,
        name: "Swimming",
        imgURL: "/sports/swimming.png"
    },
    {
        id:5,
        name:"Gym and Training",
        imgURL: "/sports/gym.png"
    }
]


const sliderData: sliderDetails[] = [
    {
        id:1,
        text: "Sale is ongoing",
        btnString: "Shop Now", 
        imgURL: "/SliderImage/slider1.jpg"
    
    },
    {
        id:2,
        text: "Check the New",
        btnString: "Shop Now", 
        imgURL: "/SliderImage/slider2.jpg",
        position: "items-end"
    }

]


function ShoeSizeDialog({dialogRef, shoeSize, setShoeSize, idNumber, orderList, handleOrder, shoesData, closeModal}: DialogProps): JSX.Element | null | string {
    function acceptOrder(){

         const orderShoes: detailsInterface | undefined = shoesData?.find(data => data.id === Number(idNumber));

        if (shoeSize === undefined) {
            console.log("error")
        } else {
            // @ts-expect-error OrderShoes might be undefined, ensuring default values
            
            const updateShoes: orderDetails = {...orderShoes, size: shoeSize ?? undefined, quantity: 1}
            handleOrder([...orderList, updateShoes])
        }




    }
    return (
        <dialog className="px-8 py-10 rounded shadow-lg" ref={dialogRef}>
            <h1 className="font-black text-3xl">Please select your size</h1>
            <h1 className="mt-4 font-bold">US Size:</h1>
            <div className="grid grid-cols-5 gap-2 mt-2">
                {Array.from({length: 7}, (_, i) => (
                    <button  className="flex items-center justify-center">
                        <span data-size = {i + 5} className="px-4 border-2 py-2 rounded-full border-black hover:bg-black hover:text-white"   
                            onClick={(e) => {
                            const size = e.currentTarget.getAttribute("data-size");
                            setShoeSize(size ? parseInt(size, 10) : null);
                        }}>{i + 5}</span>
                    </button>
                ))}
            </div>
            <div className="mt-4 font-bold">
                <h1>Shoe Size: {shoeSize}</h1>
            </div>
            <div className="mt-4 font-bold">
                <h1>Product Id: {idNumber}</h1>
            </div>
            <div className="flex mt-4 justify-around">
                <button className="bg-green-600 px-4 rounded-full py-1 text-white font-bold shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:scale-110"
                    onClick={acceptOrder}
                >+ Add to cart</button>
                <button className="bg-red-600 px-4 rounded-full py-1 text-white font-bold shadow-xl transition-transform duration-500 hover:-translate-y-1 hover:scale-110" onClick={closeModal}>X Close</button>
            </div>
        </dialog>
    )
}


export default function BodyElement({ orderData, handleOrder, clearAll }: BodyProps): JSX.Element | null | string {
    const [shopListData, setShopListData] = useState<shopListInterface[]>(shopList);
    const [descriptionFirstBody, setDescriptionFirstBody] = useState<string>(shopList[0]["description"] ? shopList[0]["description"] : "")
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [orderIdNumber, setOrderIdNumber] = useState<string>("0");
    const [sizeShoes, setSizeShoes] = useState<number | null | undefined>();
    const [shoesData, setShoesData] = useState<detailsInterface[] | null>(popularData)

    const openDialog = () => {
        dialogRef.current?.showModal()

    }
    const closeModal = () => {
        dialogRef.current?.close();
    }





    function handleSelectType(id: number, description: string, data:detailsInterface[] | null) {
        const update_data: shopListInterface[] = shopListData.map(
            (list: shopListInterface) => list.id === id ? { ...list, click: true } : { ...list, click: false }
        )
        setShopListData(update_data)
        setDescriptionFirstBody(description)
        setShoesData(data)
    }   

    return (

        <div className="p-5 px-10 mt-8">

            <ShoeSizeDialog 
                dialogRef={dialogRef} 
                shoeSize={sizeShoes} 
                setShoeSize={setSizeShoes}
                idNumber = {orderIdNumber}
                orderList = {orderData}
                handleOrder = {handleOrder}
                shoesData = {shoesData}
                clearAll={clearAll}
                closeModal ={closeModal}

            />
            <div className="w-full flex justify-center">
                <img src={Logo} alt="" />
            </div>
            <div className="text-center mt-2">
                <h1 className="italic text-[18px]" id="qoute">Give the Gift of Comfort—Shoes That Step Up Their Style.</h1>
            </div>
            <div className="flex w-full mt-8 justify-center">
                <ul className="flex justify-between w-full md:w-3/6 md:justify-center md:gap-16">
                    {shopListData.map(list => (
                        <li
                            key={list.id}
                            className={`cursor-pointer  ${list.click ? "bg-black px-4 text-white rounded-full" : "hover:text-slate-500"}`}
                            onClick={() => handleSelectType(list.id, list.description ? list.description : "", list.data)}
                        >
                            {list.name}
                        </li>
                    ))
                    }

                </ul>
            </div>
            <div className="mt-12"><h1 className="text-3xl font-bold">{descriptionFirstBody}</h1></div>
            <div className="mt-12 overflow-hidden hover:overflow-x-auto">
                <ul className="flex gap-8 ">
                    {
                        shopListData.map(shop => (shop.click && (
                            shop.data?.map(shoes => (
                                <li
                                    className="shadow-2xl rounded-xl border-2 relative flex-shrink-0"
                                    key={shoes.id}
                                >
                                    <img src={shoes.imgURL} alt={shoes.name} className="w mt-6 w-[400px] h-[400px]" />
                                    <div className = "absolute inset-0 flex justify-end items-end my-9 mx-8 gap-2">
                                        <h1>
                                            <span className="text-white bg-black px-4 font-bold rounded-xl cursor-pointer hover:shadow-xl hover:shadow-slate-800 hover:-translate-y-2 transition-all duration-200 hover:scale-105">{shoes.name}</span>
                                        </h1>
                                        <button 
                                            id = {String(shoes.id)}
                                            onClick={(e) => {
                                                openDialog()
                                                setOrderIdNumber(e.currentTarget.id)
                                            }} 
                                            className ="px-2 py-2 rounded-full -my-2 shadow border-2 bg-black text-white transition-all duration-300  active:scale-50  hover:scale-110"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus-fill " viewBox="0 0 16 16">
                                                <path fill-rule="evenodd" d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0M8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5z"/>
                                            </svg>
                                        </button>

                                    </div>

                                </li>
                            ))
                        )))
                    }
                </ul>
                <br />
            </div>
            <div className="mt-12">
                <h1 className="text-3xl font-bold  drop-shadow-2xl">Know Yourself More</h1>
            </div>
            <div className="mt-8">
                <ul className="flex gap-4 overflow-hidden hover:overflow-x-auto">
                    {greatestData.map(data => (
                        <li className="flex-shrink-0">
                            <img src={data.imgURL} alt="" className="w-[500px] h-[600px] drop-shadow-xl" />
                            <h1 className="mt-2 font-bold text-xl">{data.name}</h1>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-12">
                <h1 className="text-3xl font-bold  drop-shadow-2xl">Sports Anywhere</h1>
            </div>
            <div className="flex flex-col md:flex-row justify-around">
                <div className="w-full md:w-1/6 flex items-center justify-center order-2 md:order-1"><h1 className=" font-black text-[35px] md:text-[65px] md:[writing-mode:vertical-lr] md:-rotate-180 text-center mt-5 md:mt-0">Give, Gift Comfort</h1></div>
                <div className="md:order-2">
                    <video loop autoPlay controls className="md:h-[720px] w-full md:w-[1280px] mt-8 rounded-lg">
                        <source src="/video/Basketball.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className="flex flex-col md:flex-row mt-10 md:mt-32 w-full justify-center items-center gap-14 md:gap-24">
                    {description.map(desc => (
                        <div className = "w-5/6 md:w-1/6 flex flex-col justify-center items-center">
                            <img src = {desc.imgURL} width={80}/>
                            <h1 className="font-bold mt-2 text-[20px]">{desc.name}</h1>
                            <p className="text-center mt-2">{desc.description}</p>
                        </div> 
                    ))}
            </div>
            <div className="mt-20">
                <h1 className="text-3xl font-bold  drop-shadow-2xl">Shop your sportwears</h1>
                <div className="flex mt-4  gap-4 overflow-hidden hover:overflow-x-auto">
                    {sports.map(sport => (
                        <div className="relative flex-shrink-0">
                            <img src={sport.imgURL} alt="" width={600} className="rounded-sm shadow"/>
                            <div className = "absolute inset-0 flex items-end my-8 mx-6">
                                <button className="px-4 bg-slate-100 py-1 rounded-full shadow font-bold shadow-black">{sport.name}</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-12">
                <h1 className="text-3xl font-bold  drop-shadow-2xl">Love your styles</h1>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={false}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next",
                        enabled: true
                    } }
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper mt-8"
                    >
                        {sliderData.map((slide) => (
                            <SwiperSlide key={slide.id}>
                                <div className=" relative w-full h-full">
                                    <img 
                                        src={slide.imgURL} 
                                        alt="" 
                                        className="h-[500px] object-cover w-full"
                                    />
                                    <div className={`absolute inset-0 text-white w-full flex flex-col justify-center md:${slide.position} mx-4 md:mx-10`}>
                                        <div className="w-full md:w-[30%]">
                                            <h1 className="text-7xl font-bold">{slide.text}</h1>
                                            <button className={`bg-white text-black font-bold px-4 rounded-full mt-6 text-xl ${slide.position} transition-all duration-200 hover:-translate-y-2 hover:shadow hover:shadow-black hover:text-white hover:bg-black`}>{slide.btnString}</button>
                                        </div>

                                    </div>

                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
            <div className="mt-12  md:h-[200px] flex flex-col justify-center items-center">
                <img src={Logo} alt="log" />
                <h1 className="font-bold">Shoes on house</h1>
                <div className="flex gap-8 mt-2">
                    <button className="bg-black text-white px-4 rounded-full transition-all duration-300 hover:-translate-y-2">Shop More</button>
                    <button className="active:text-slate-300 hover:text-slate-400">Join Us</button>
                </div>
            </div>
            <hr className="mt-8"/>
        </div>
    )
}