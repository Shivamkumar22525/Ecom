import React from 'react'
import {assets} from '../../src/assets/assets'

const NavBar = ({setToken})=>{
    return(
        <div className='flex item-center py-2 px-[4%] justify-between'>
            <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
            <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full test-xs sm:text-sm'>Logout</button>

        </div>
    )
}
export default NavBar;