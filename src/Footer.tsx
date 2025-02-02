import { useState } from "react"

interface footerInterface {
    readonly id: number
    title : string
    listData?: string[]
    click: boolean
}

const footerData: footerInterface[] = [

    {
        id: 1,
        title: "Resources",
        listData: ["Gift Cards", "Membership", "Journal", "Feedback", "Store"],
        click: false
    },
    {
        id:2, 
        title: "Help",
        listData: ["Get Help", "Order Status", "Returns", "Contact Us", "Order Cancellation"],
        click: false
    },
    {
        id:3,
        title: "Company",
        listData: ["About Company", "News", "Investors", "Purpose", ],
        click: false
    },
    {
        id:4,
        title: "Promotions and Discounts",
        listData: ["Student", "Military", "Birthday"],
        click: false
        
    },
]





export default function Footer() : JSX.Element | string | null {
    const [accordian, setAccordian] = useState<footerInterface[]>(footerData);


    function showList(id:number):void{
        console.log(id)
        const updateData = accordian.map(
            data => data.id === id ? {...data, click: !data.click} : {...data, click: data.click    }
        )
        setAccordian(updateData);

    }
    return (
        <>        
            <div className="p-5 px-10 bg-slate-950 text-white hidden md:flex justify-between">
            {
                footerData.map((footer) => (
                    <div className="mt-8 mb-8">
                        <h1 className="font-semibold">{footer.title}</h1>
                        <ul className="mt-8 flex flex-col gap-4 text-sm">
                            {footer.listData?.map((strList) => (
                                <li className="hover:text-slate-400"><a href="">{strList}</a></li>
                            )) }
                        </ul>
                    </div>
                ))
            }
                <div className="mt-8 mb-8">Phillippines</div>
            </div>
            <div className="p-5 px-10 md:hidden bg-slate-950 text-white">
                {accordian.map((footer) => (
                    <div className="mt-4 mb-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl">{footer.title}</h1>   
                            <button className={`${footer.click ? " transition-all duration-150 rotate-180" : "transition-all duration-150 rotate-0"}`} onClick={() => 
                                showList(footer.id)}>
                                    <svg className="" 
                                        xmlns="http://www.w3.org/2000/svg" width="34" height="34" 
                                        viewBox="0 0 24 24"><path fill="currentColor" 
                                        d="m11.565 13.873l-2.677-2.677q-.055-.055-.093-.129q-.037-.073-.037-.157q0-.168.11-.289q.112-.121.294-.121h5.677q.181 0 .292.124t.111.288q0 .042-.13.284l-2.677 2.677q-.093.093-.2.143t-.235.05t-.235-.05t-.2-.143"/>
                                    </svg>
                            </button>
                        </div>
                        {footer.click && (
                            <ul className="mt-4 flex gap-2 flex-col">
                                {footer.listData?.map((strList) => (
                                    <li className="hover:text-slate-400 hover:translate-x-1 transition-all duration-150"><a href="">{strList}</a></li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
}
