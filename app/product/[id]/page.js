"use client"

import MainLayout from "@/app/layouts/MainLayout"
import SimilarProducts from "../../components/SimilarProducts"
import { useCart } from "@/app/context/cart"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import useIsLoading from "@/app/hooks/useIsLoading"

export default function Product({ params }) {

    //from cart.js - to add and remove cart function
    const cart = useCart()

    //1.product from state(put)
    const [product, setProduct] = useState({})

    const getProduct = async () => {
        useIsLoading(true)
        //2. set product to an empty object
        setProduct({})

        //3.fetch API product by id from product/[id]-route.js
        const response = await fetch(`/api/product/${params.id}`)
        //4.convert it to json
        const prod = await response.json()
        //5.set product by passing prod
        setProduct(prod)
        //6.set product & then we want cart is i demanded the card and pass the product
        cart.isItemAddedToCart(prod)
        //useisloading - false b/c initialy true
        useIsLoading(false)

    }

    useEffect(() => {
        getProduct()
    }, [])

    //pass products from app-page.js
    //we did't need arry we need object
    //todo: test(hard code)
    // const product =
    // {
    //     id: 1,
    //     title: "Brown leather Bag",
    //     description: "dfghjkhiyutfcgvhuytfgcv",
    //     url: "https://picsum.photos/id/7",
    //     price: 2500
    // }

    return (
        <>
            <MainLayout>
                <div className="max-w-[1200px] mx-auto">
                    <div className="flex px-4 py-10">

                        {product?.url
                            ? <img className="w-[40%] rounded-lg" src={product?.url + '/280'} />
                            : <div className="w-[40%]"></div>
                        }

                        <div className="px-4 w-full">
                            <div className="font-bold text-xl">{product?.title}</div>
                            <div className="text-sm text-gray-700 pt-2">Brand New - Full Warranty</div>

                            <div className="border-b py-1" />

                            <div className="pt-3 pb-2">
                                <div className="flex items-center">
                                    Condition: <span className="font-bold text-[17px] ml-2">New</span>
                                </div>
                            </div>

                            <div className="border-b py-1" />

                            <div className="pt-3">
                                <div className="w-full flex items-center justify-between">
                                    <div className="flex items-center">
                                        {/* if product price exists then display or not return null*/}
                                        Price:
                                        {product?.price
                                            ? <div className="font-bold text-[20px] ml-2">
                                                GBP £{(product?.price / 100).toFixed(2)}
                                            </div>
                                            : null}
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (cart.isItemAdded) {
                                                cart.removeFromCart(product)
                                                toast.info('Removed from cart', { autoClose: 3000 })
                                            } else {
                                                cart.addToCart(product)
                                                toast.success('Added to cart', { autoClose: 3000 })
                                            }
                                        }}
                                        className={`
                      text-white py-2 px-20 rounded-full cursor-pointer 
                      ${cart.isItemAdded ? 'bg-[#e9a321] hover:bg-[#bf851a]' : 'bg-[#3498C9] hover:bg-[#0054A0]'}
                    `}
                                    >
                                        {cart.isItemAdded ? 'Remove From Cart' : 'Add To Cart'}
                                    </button>
                                </div>
                            </div>

                            <div className="border-b py-1" />

                            <div className="pt-3">
                                <div className="font-semibold pb-1">Description:</div>
                                <div className="text-sm">{product?.description}</div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* for similar products */}
                <SimilarProducts />

            </MainLayout >
        </>
    )
}