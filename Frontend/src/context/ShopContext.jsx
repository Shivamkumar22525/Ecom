import React, { useEffect, useState } from "react";
import { createContext } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';


export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    

    const currency = '₹';
    const delivery_fee = 11;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products,setProducts] = useState([]);
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItem,setCartItem] = useState({});
    const [token,setToken] = useState('');
    const navigate = useNavigate();

    const addToCart = async (itemId,size)=>{

        if(!size){
            toast.error("Please select size")
            return;
        }
        
        let cartData = structuredClone(cartItem);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }else{
                cartData[itemId][size] = 1;
            }
        }else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }
    }

    const getCartCount =  ()=>{
        
        let totalCount = 0;

        for(const items in cartItem){
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item] > 0){
                        totalCount+=cartItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId,size,quantity)=>{
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(message.error)
                
            }
        }

    }

    const getCartData = async (token)=>{
        try {
            const res = await axios.get(backendUrl+'/api/cart/get',{headers:{token}})
            if(res.data.success){
                setCartItem(res.data.cartData);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }

    const getCartAmount =  ()=>{
        let totalAmount = 0;
        for(const items in cartItem){
            let itemInfo = products.find((product)=> product._id === items);
            // console.log(itemInfo);
            for(const item in cartItem[items]){
                try {
                    if(cartItem[items][item] > 0){
                        totalAmount+=itemInfo.price * cartItem[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }
    
    const getProducts = async ()=>{
        try {
            // const res = await axios.get('http://localhost:3000/api/product/list')
            const res = await axios.get(backendUrl+'/api/product/list')
            // console.log(backendUrl);

            if(res.data.success){

                setProducts(res.data.products)
            }else{
                toast.error(Response.data.message);
            }
                       
            // setProducts(res.data);
            // console.log("you are here")
            // console.log(res.data);
        } catch (error) {
            console.log(error)
            toast.error(error.message);
            
        }
    }
    useEffect(()=>{
        getProducts();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getCartData(localStorage.getItem('token'));
        }
    },[])
    
    const values = {
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,
        addToCart,cartItem,getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,setToken,token,setCartItem
    }
    return (
        <ShopContext.Provider value={values}>
        {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;