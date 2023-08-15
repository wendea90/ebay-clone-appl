"use client"

import { useEffect, useState } from "react";
import CarouselComp from "./components/CarouselComp";
import Product from "./components/Product";
import MainLayout from "./layouts/MainLayout";
import useIsLoading from "./hooks/useIsLoading";

export default function Home() {

  const [products, setProducts] = useState([])

  const getProducts = async () => {
    useIsLoading(true)

    //todo: WE GET ALL OF OUR PRODUCTS IN MAIN PAGE
    //1.went to get our products from our API end point w/c is API products
    const response = await fetch('/api/products')
    //2.convert it to json
    const prods = await response.json()

    //3.finally that products and you can see i've cleard out the products
    setProducts([])
    setProducts(prods)
    useIsLoading(false)
  }

  useEffect(() => { getProducts() }, [])


  //todo test of hard code
  {/* to fetch all products first dumy data fetch(fake data)*/ }
  // const products = [
  //   {
  //     id: 1,
  //     title: "Brown leather Bag",
  //     description: "dfghjkhiyutfcgvhuytfgcv",
  //     url: "https://picsum.photos/id/7",
  //     price: 2500
  //   },
  //   {
  //     id: 2,
  //     title: "school book",
  //     description: "rfegtdfghjkhiyutfewfrgtcgvhuytfgcv",
  //     url: "https://picsum.photos/id/20",
  //     price: 1500
  //   }
  // ]

  //now the real url pass


  return (
    <MainLayout>

      {/* animated slide banner */}
      <CarouselComp />

      {/* products */}
      <div className="max-w-[1200px] mx-auto">
        <div className="text-2xl font-bold mt-4 mb-6 px-4">
          Products
        </div>

        {/* to fetch all products */}
        <div className="grid grid-cols-5 gap-4">
          {/* make products component -by loop it*/}
          {products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
