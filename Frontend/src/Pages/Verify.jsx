import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'
import { useEffect } from 'react';

const Verify = () => {
    const {navigate, token, setCartItem, backendUrl} = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async ()=>{
        try {
            if(!token){
                return null;
            }
            const res = await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}});
            // console.log(res.data)
            if(res.data.success){
                setCartItem({})
                navigate('/orders')
            }else{
                navigate('/cart')
                toast.error("Payment failed")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)           
            
        }
    }
    useEffect(()=>{
        verifyPayment()
    },[token])
  return (
    <div>
      Redirecting to the Orders Page.......
    </div>
  )
}

export default Verify
