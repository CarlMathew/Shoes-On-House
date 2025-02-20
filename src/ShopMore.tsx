import { useEffect, useState } from "react"
import {detailsInterface} from "./types"

let allShoes: detailsInterface[] =
    [
        {
            id: 1,
            name: "StrideX",
            imgURL: "/popular/sample_shoes.png",
            price: 102.99,
            category: "Popular",
        },
        {
            id: 2,
            name: "SoleCraft",
            imgURL: "/popular/sample_shoes2.png",
            price: 111.15,
            category: "Popular",
        },
        {
            id: 3,
            name: "TrailTread",
            imgURL: "/popular/sample_shoes3.png",
            price: 121.55,
            category: "Popular",
        },
        {
            id: 4,
            name: "FlexiStep",
            imgURL: "/popular/sample_shoes4.png",
            price: 200.24,
            category: "Popular",
        },
        {
            id: 5,
            name: "UrbanSoles",
            imgURL: "/popular/sample_shoes5.png",
            price: 80.99,
            category: "Popular",
        },
        {
            id: 6,
            name: "RapidTrail",
            imgURL: "/new/new_shoes1.png",
            price: 100.50,
            category: "News",
        },
        {
            id: 7,
            name: "DynamicStride",
            imgURL: "/new/new_shoes2.png",
            price: 220.55,
            category: "News",
        },
        {
            id: 8,
            name: "CloudTread",
            imgURL: "/new/new_shoes3.png",
            price: 105.99,
            category: "News",
        },
        {
            id: 9,
            name: "TerrainFlow",
            imgURL: "/new/new_shoes4.png",
            price: 112.22,
            category: "News",
        },
        {
            id: 10,
            name: "VelocityVibe",
            imgURL: "/new/new_shoes5.png",
            price:304.55,
            category: "News",
        }
    
    ]

allShoes = allShoes.map(shoes => { 
    return {...shoes, click:true}
})


export default function ShopMore(): JSX.Element | string | null {
    const [shoesData, setShoesData] = useState<detailsInterface[]>(allShoes)
    const [count, setCount] = useState<number>(0);

    useEffect(()=> {
       if (count == 0 ){
        setShoesData(allShoes)
       }
    }, [count])

    function filterShoes(e:React.ChangeEvent<HTMLInputElement>){
    
        if(e.target.checked && count == 0){
            console.log("Dito 1")
            const updated_data: detailsInterface[] = shoesData.map(shoes => shoes.category === e.target.value ? {...shoes, click:true} : {...shoes, click:false})
            setShoesData(updated_data)
            setCount(count + 1)
 
        } else if (e.target.checked && count !==0){
            console.log("Dito 2")
            const updated_data: detailsInterface[] = shoesData.map(shoes => shoes.category === e.target.value ? {...shoes, click:true} : shoes)
            setShoesData(updated_data)
            setCount(count + 1)
        } else if (!e.target.checked && count !== 0){
            console.log("Dito 3")
            const updated_data: detailsInterface[] = shoesData.map(shoes => shoes.category === e.target.value ? {...shoes, click:false} : shoes)
            setShoesData(updated_data)
            setCount(count - 1)
        } 

        
    }
    return(
        <div className="flex h-full">
            <div className=" w-[18%] border-r-2 border-l-2 border-slate-300">
                <div className="w-full">
                    <div className="flex gap-1 items-center px-10 pt-5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                        </svg>
                        <h1 className="text-xl font-bold">Filter</h1>
                    </div>
                </div>
                <div className="px-10 mt-5">
                    <form className=" mt-4 rounded pb-5 px-2">
                        <div className = "flex items-center gap-2">                        
                            <input type="checkbox" 
                                className="rounded" onChange={(e) => filterShoes(e)} 
                                value="all"
                            />
                            <label htmlFor="">All</label>
                        </div>
                        <div className = "flex items-center gap-2 mt-2">                        
                            <input type="checkbox" className="rounded" 
                                value = "Mens" 
                                onChange={(e) => filterShoes(e)} />
                            <label htmlFor="">Men's</label>
                        </div>
                        <div className = "flex items-center gap-2 mt-2">                        
                            <input 
                                type="checkbox" className="rounded"
                                onChange={(e) => filterShoes(e)}
                                value = "Womens"  
                            />
                            <label htmlFor="">Women's</label>
                        </div>
                        <div className = "flex items-center gap-2 mt-2">                        
                            <input 
                                type="checkbox" 
                                className="rounded"
                                onChange={(e) => filterShoes(e)}
                                value = "Kids"
                            />
                            <label htmlFor="">Kid's</label>
                        </div>

                        <hr  className ="border-black mt-2"/>
                        <div className = "flex items-center gap-2 mt-2">                        
                            <input 
                                type="checkbox" 
                                className="rounded"
                                onChange ={(e)=> filterShoes(e)}
                                value ="News"
                            />
                            <label htmlFor="">New Product</label>
                        </div>
                        <div className = "flex items-center gap-2 mt-2">                        
                            <input 
                                type="checkbox" 
                                className="rounded"
                                onChange ={(e)=> filterShoes(e)}
                                value ="Popular"
                            />
                            <label htmlFor="">Most Popular</label>
                        </div>

                    </form>
                </div>
            </div>
            <div className="p-5 b w-[88%]">
                <div className =" w-full flex justify-end items-center mt-4 gap-2">
                    <input type="text" className="w-[1/5] rounded-full h-[28px]" placeholder="Search.."/>
                    <button className="px-2 rounded-xl border-black drop-shadow-2xl shadow-black shadow border-2 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                    </button>
                </div>
                <div className="overflow-y-auto border-t-2 mt-8 grid grid-cols-4 py-2 gap-2 relative h-[88%]">
                        {shoesData.map(shoes => (
                            shoes.click && (
                                <div className="mt-8">
                                    <div className="border-2 h-[320px]  items-center flex justify-center bg-gray-200">
                                        <img src={shoes.imgURL} alt="Shoes"/>
                                    </div>
                                    <div className="text-end font-bold mt-2">{shoes.name}</div>
                                    <div className="text-end text-slate-400">${shoes.price}</div>
                                    <div className="flex justify-end"><button className="border-2 px-4 rounded-xl mt-2 border-black hover:bg-black hover:text-white">Buy</button></div>
                                </div>
                        )))}
                </div>
            </div>
        </div>
    )
}