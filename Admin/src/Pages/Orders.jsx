import React from 'react'
import { useState } from 'react';
import { backendUrl, currency } from '../App'
import { useEffect } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        if (!token) {
            return null;
        }
        try {
            const res = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
            // console.log(res.data)
            if (res.data.success) {
                setOrders(res.data.orders.reverse());
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const statusHandler = async(e,orderId)=>{
        try {
            const res = await axios.post(backendUrl+'/api/order/status',{orderId,status:e.target.value}, {headers:{token}})
            if(res.data.success){
                await fetchAllOrders()
            }
        } catch (error) {
            console.log(error)
            toast.error(res.data.message)
            
        }
    }
    useEffect(() => {
        fetchAllOrders()
    }, [token])
    return (
        <div>
            <h3>Order Page</h3>
            <div>
                {
                    orders.map((order, index) => (
                        <div key={index} className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700'>
                            <img className='w-12' src={assets.parcel_icon} alt="" />
                            <div>
                                <div>
                                    {
                                        order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span></p>
                                            } else {
                                                return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>
                                            }
                                        })
                                    }
                                </div>
                                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + ' ' + order.address.lastName}</p>
                                <div>
                                    <p>{order.address.street + ','}</p>
                                    <p>{order.address.city + ',' + order.address.state + ',' + order.address.zipcode + ',' + order.address.country}</p>
                                </div>
                                <p>{order.address.phone}</p>
                            </div>
                            <div>
                                <p className='text-sm sm:text-[15px]'>Items: {order.items.length}</p>
                                <p className='mt-3'>Method: {order.paymentMethod}</p>
                                <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date: {new Date(order.date).toLocaleString('en-US',{year: 'numeric', month: 'long',day: 'numeric'})}</p>
                            </div>
                            <p className='text-sm sm:text-[15px]'>Total Amount: {currency}{order.amount}</p>
                            <select onChange={(e)=>statusHandler(e,order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Order Packing">Order Packing</option>
                                <option value="Order Shipped">Order Shipped</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}
export default Orders;