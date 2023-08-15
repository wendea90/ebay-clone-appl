"use client"

import { useRouter } from "next/navigation";
import { createContext, useState, useContext } from "react";

const Context = createContext();

const Provider = ({ children }) => {
    const router = useRouter()

    const [isItemAdded, setIsItemAdded] = useState(false)

    //let json = '{"name":"John", "age":30, "city":"New York"}';
    // let obj = JSON.parse(json);
    // console.log(obj.name); // Outputs: John

    //1. get cart 1
    const getCart = () => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        return cart
    }

    const addToCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }

        //get that cart object
        cart.push(product);
        //reset our  localStorage to update the cart
        localStorage.setItem('cart', JSON.stringify(cart));
        isItemAddedToCart(product)
        router.refresh()
    }

    // 2. remove cart
    const removeFromCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }

        //filter cart & the item id is not equal to the product id
        cart = cart.filter(item => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        isItemAddedToCart(product)
        router.refresh()
    }

    // 3.Add to cart
    const isItemAddedToCart = (product) => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }

        //filter cart & the item id is equal to the product id
        cart = cart.filter(item => item.id === product.id);

        if (cart.length > 0) {
            setIsItemAdded(true)
            return
        }

        setIsItemAdded(false)
    }

    const cartCount = () => {
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        return cart.length
    }

    const cartTotal = () => {
        let total = 0
        let cart = []
        if (typeof localStorage !== "undefined") {
            cart = JSON.parse(localStorage.getItem('cart')) || [];
        }
        for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            total += element.price
        }

        return total
    }

    const clearCart = () => {
        localStorage.removeItem('cart')
        router.refresh()
    }

    const exposed = {
        isItemAdded,
        getCart,
        addToCart,
        removeFromCart,
        isItemAddedToCart,
        cartCount,
        cartTotal,
        clearCart
    };

    return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => useContext(Context);

export default Provider;