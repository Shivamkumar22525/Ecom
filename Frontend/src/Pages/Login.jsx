import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import {Eye, EyeOff} from 'lucide-react';

const Login = () => {
  const [currentState,setCurrentState] = useState('Login');
  const {token, setToken,navigate, backendUrl} = useContext(ShopContext);
  const [name,setName] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [email,setEmail] = useState('');

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      if(currentState==='Sign Up'){
        const res = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        // console.log(res.data);
        if(res.data.success){
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token);
        }else{
          toast.error(res.data.message);
        }
      }else{
        const res = await axios.post(backendUrl+'/api/user/login',{email,password})
        console.log(res.data);
        if(res.data.success){
          setToken(res.data.token);
          localStorage.setItem('token',res.data.token);
        }else{
          toast.error(res.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }

  useEffect(()=>{
    if(token){
      navigate('/');
    }

  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />

      </div>
      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='Name' required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
      <div className='relative w-full max-w-md'>
        <input onChange={(e)=>setPassword(e.target.value)} value={password} type={showPassword ? "text" : "password"} className='w-full px-3 py-2 border border-gray-800 ' placeholder='Password' required/>
        <span onClick={()=>setShowPassword((prev)=>!prev)} className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 hover:text-gray-900'>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</span>
      </div>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forgot Password?</p>
        {
          currentState === 'Login' ?
          <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p> :
          <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }

      </div>
      <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState==='Login'? 'Sign In' : 'Sign Up'}</button>
      
    </form>
  )
}

export default Login
