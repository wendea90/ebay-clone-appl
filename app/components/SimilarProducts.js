'use client'


import { useEffect, useState } from "react"
import ProductComp from "./Product"
import { BiLoader } from 'react-icons/bi'

export default function SimilarProducts() {

    //1.set state to catch/dispach - to get all the product
    const [products, setProducts] = useState([])

    //2.make function - 
    const getRandomProducts = async () => {
        try {
            //2.going to fetch from our API products get random &
            const response = await fetch('/api/products/get-random')
            //3.convert that to json
            const result = await response.json()

            //4.then set setproducts
            if (result) {
                setProducts(result)
                return
            }

            setProducts([])
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }

    useEffect(() => { getRandomProducts() }, [])


    //todo: hard code
    // const products = [
    //     {
    //         id: 1,
    //         title: "Brown leather Bag",
    //         description: "dfghjkhiyutfcgvhuytfgcv",
    //         url: "https://picsum.photos/id/7",
    //         price: 2500
    //     },
    //     {
    //         id: 2,
    //         title: "school book",
    //         description: "rfegtdfghjkhiyutfewfrgtcgvhuytfgcv",
    //         url: "https://picsum.photos/id/20",
    //         price: 1500
    //     }
    // ]

    return (
        <>
            <div>
                <div className="border-b py-1 max-w-[1200px] mx-auto" />

                <div className="max-w-[1200px] mx-auto">
                    <div className="font-bold text-2xl py-2 mt-4">
                        Similar sponsored items
                    </div>

                    {products.length > 0 ?
                        <div className="grid grid-cols-5 gap-4">
                            {products.map(product => (
                                <ProductComp key={product.id} product={product} />
                            ))}
                        </div>
                        : <div className="flex items-center justify-center">
                            <div className="flex items-center justify-center gap-4 font-semibold">
                                <BiLoader size={30} className="text-blue-400 animate-spin" />
                                Loading Products...
                            </div>
                        </div>}

                </div>
            </div>
        </>
    )

}