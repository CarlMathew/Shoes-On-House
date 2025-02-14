export default function ShopMore(): JSX.Element | string | null {
    return(
        <div className="flex h-full">
            <div className="border-slate-400 w-[18%] px-10 p-5 bg-slate-950 text-white">
                <div className="flex gap-1 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                        <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
                    </svg>
                    <h1 className="text-xl font-bold">Filter</h1>
                </div>

            </div>
            <div className="p-5 b w-[88%]">Test</div>
        </div>
    )
}