"use client"


import { debounce } from "debounce";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import { BiLoaderCircle } from 'react-icons/bi'


export default function MainHeader() {

    //1.state(useState)-going to items& is serching
    const [items, setItems] = useState([])
    const [isSearching, setIsSearching] = useState(null)

    //2.handlesearchname function
    //Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, which would cause high CPU usage. 
    const handleSearchName = debounce(async (event) => {
        //2.if the value being passed equals an empty string 
        if (event.target.value == "") {
            //3.we set the items to noting
            setItems([])
            return
        }

        //4.if there is a value pass searching is true
        setIsSearching(true)

        try {
            //5.fatch API products by name from search-by-name-route.js
            const response = await fetch(`/api/products/search-by-name/${event.target.value}`)
            const result = await response.json()

            //6.if result we want to set items so set the result that is search into false b/ we got the information
            if (result) {
                setItems(result)
                setIsSearching(false)
                return
            }
            //7.if there is no result all we do is we set items to an empty array & set is search into false
            setItems([])
            setIsSearching(false)
        } catch (error) {
            console.log(error)
            alert(error)
        }
        //debounce is 500 if we stop typing & we start typing again we have 500millisecons before the next call is made to our API which fetch(..).. then get info from our database
    }, 500)

    return (
        <>
            <div id="MainHeader" className="border-b">
                <nav className="flex items-center justify-between w-full mx-auto max-w-[1200px]">
                    <div className="flex items-center w-full bg-white">
                        <div className="flex lg:justify-start justify-between gap-10 max-w-[1150px] w-full px-3 py-5 mx-auto">
                            <Link href="/">
                                <img width="120" src="/images/logo.svg" />
                            </Link>

                            <div className="w-full">
                                <div className="relative">

                                    <div className="flex items-center">
                                        <div className="relative flex items-center border-2 border-gray-900 w-full p-2">

                                            <button className="flex items-center">
                                                <AiOutlineSearch size={22} />
                                            </button>

                                            <input
                                                className="
                                                    w-full
                                                    placeholder-gray-400
                                                    text-sm
                                                    pl-3
                                                    focus:outline-none
                                                "
                                                onChange={handleSearchName}
                                                placeholder="Search for anything"
                                                type="text"
                                            />

                                            {/* issearching if that is true we want tp put in the icon & we want to animate spin forever else if it is false we set null*/}
                                            {isSearching ? <BiLoaderCircle className="mr-2 animate-spin" size={22} /> : null}

                                            {/* 1.if that is greater than zero we want to say */}
                                            {items.length > 0 ?
                                                //2.items.length if that is greater than zero we want to say b/c want to show the items that we've got back from the database 
                                                <div className="absolute bg-white max-w-[910px] h-auto w-full z-20 left-0 top-12 border p-1">
                                                    {/* 3.loop our items  */}
                                                    {items.map((item) => (
                                                        <div className="p-1" key={item.id}>
                                                            <Link
                                                                href={`/product/${item?.id}`}
                                                                className="flex items-center justify-between w-full cursor-pointer hover:bg-gray-200 p-1 px-2"
                                                            >
                                                                <div className="flex items-center">
                                                                    <img className="rounded-md" width="40" src={item?.url + '/40'} />
                                                                    <div className="truncate ml-2">{item?.title}</div>
                                                                </div>
                                                                <div className="truncate">£{(item?.price / 100).toFixed(2)}</div>
                                                            </Link>
                                                        </div>
                                                    ))}
                                                </div>
                                                : null}

                                        </div>

                                        <button className="flex items-center bg-blue-600 text-sm font-semibold text-white p-[11px] ml-2 px-14">
                                            Search
                                        </button>

                                        <div className="text-xs px-2 hover:text-blue-500 cursor-pointer">Advanced</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}