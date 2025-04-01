import React from "react";
import { createContext } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency = '₹';
    const delivery_fee = 11.99;

    const values = {
        products,currency,delivery_fee
    }
    return (
        <ShopContext.Provider value={values}>
        {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;