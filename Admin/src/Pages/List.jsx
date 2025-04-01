import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({ token }) => {
    const [list, setList] = useState([]);
    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + "/api/product/list");
            // console.log(response.data.products);
            if (response.data.success) {
                setList(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const remove = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);

        }
    }
    useEffect(() => {
        fetchList();
    }, [setList])
    return (
        <>
            <p className='text-lg font-medium mb-4'>List of Products</p>
            <div className='flex flex-col w-[80rem] gap-2 border rounded-lg overflow-hidden shadow-sm'>
                {/*------------------- title of table of all products----------- */}
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-gray-100 text-sm font-medium border-b'>
                    <p>Images</p>
                    <p>Name</p>
                    <p>Category</p>
                    <p className='text-center'>Price</p>
                    <p className='text-center'>Action</p>
                </div>

                {/*----all products will display here-------*/}
                {list.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">No products in the list</div>
                ) : (
                    list.map((item, index) => (
                        <div
                            className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 md:gap-0 p-3 md:py-3 md:px-4 hover:bg-gray-50 transition-colors border-b last:border-b-0"
                            key={index}
                        >
                            <div className="flex ">
                                <img
                                    className="w-20 h-22 object-contain rounded-sm"
                                    src={item.image[0]}
                                    alt={`${item.name}`}
                                    onError={(e) => { e.target.src = '/placeholder-image.jpg' }}
                                />
                            </div>

                            <div className="truncate pr-2">
                                <p className="font-medium text-gray-800">{item.name}</p>
                                <p className="text-xs text-gray-500 md:hidden">{item.category}</p>
                            </div>

                            <p className="text-sm text-gray-600 hidden md:block">{item.category}</p>

                            <p className="font-medium text-right md:text-center">{currency}{item.price}</p>

                            <div className="md:text-center">
                                <button
                                    onClick={() => remove(item._id)}
                                    className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded transition-colors text-sm whitespace-nowrap"
                                    aria-label={`Remove ${item.name}`}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
export default List;