import { useState } from "react"
import "./Navbar.css"
import {  NavbarProps } from "./types";



export default function Navbar({contentList, order, linkList}: NavbarProps): JSX.Element | null | string {
    
    const [openOptions, setOpenOptions] = useState<boolean>(false);
    return ( 
        <div className=" md:bg-slate-950  border-1 border-black md:p-5 md:px-10 text-white w-full z-50 fixed md:relative">
            <div className=" w-full hidden md:flex ">
                <div className="w-1/2 md:visible">Shoes on House</div>
                <ul className="w-1/2 flex justify-end gap-6">
                    {contentList.map((content, i) => (
                        <li className="hover:text-slate-400"><a href={linkList[i]}>{content}</a></li>
                    ))}
                    <li className="">
                        <a href="/checkout" className="flex items-center justify-center gap-1">
                            <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M4.004 6.417L.762 3.174L2.176 1.76l3.243 3.243H20.66a1 1 0 0 1 .958 1.287l-2.4 8a1 1 0 0 1-.958.713H6.004v2h11v2h-12a1 1 0 0 1-1-1zm1.5 16.586a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m12 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3"/></svg>
                            <h1 className="bg-white text-black px-2 rounded-full">{order.length}</h1>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex justify-between items-center md:hidden bg-slate-950 py-4 px-10">
                <div>Shoes on House</div>
                <div className="">
                    <button className="flex items-center" onClick={() => setOpenOptions(!openOptions)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div className={`bg-slate-950 md:hidden px-10 ${openOptions ? "transition-all translate-y-0": "transition-all -translate-y-40"}`}>
                <hr className=" border-slate-700"/>
                <ul className=" flex flex-col justify-end gap-2 mt-2 pb-4">
                    {contentList.map((content) => (
                        <li className="transition-all duration-150 hover:translate-x-2 hover:text-slate-400"><a href="" className="">{content}</a></li>
                    ))}
                </ul> 
            </div>

        </div>
    )
}