import { useState } from 'react';
import React from 'react'
import Header from './Header'

const Login = () => {
  const[isSignInForm,setSignInForm] = useState(true);
  const toggleSignInForm = () =>{
   setSignInForm(!isSignInForm);
    // console.log("State after toggle:", !isSignInForm); 
  }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg'
          alt='bg'
        />
      </div>
      <form className='p-10 w-4/12  relative top-40 mr-auto ml-auto bg-black bg-opacity-80 flex flex-col rounded-md'>
        <h1 className='px-8 pb-2 text-white font-semibold text-3xl'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className='flex flex-col items-center'>
          {!isSignInForm && (
            <input
            type='text'
            placeholder='Name'
            className='m-2 p-2 w-10/12 bg-transparent border-[1px] border-gray-400 rounded-md font-light outline-inherit'
          />)}
          <input
            type='text'
            placeholder='Email or Mobile Number'
            className='m-2 p-2 w-10/12 bg-transparent border-[1px] border-gray-400 rounded-md font-light outline-inherit'
          />
          <input
            type='password'
            placeholder='Password'
            className='m-2 p-2 w-10/12 bg-transparent border-[1px] border-gray-400 rounded-md font-light outline-inherit'
          />
          <button className='m-2 p-2 w-10/12 bg-red-600 hover:bg-red-700 text-white rounded-md'>
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className='flex flex-col'>
          <p className='px-8 pt-2 text-zinc-400 font-light text-sm'>
            {isSignInForm ? "New to Netflix?" : "Already a member?"}{" "}
            <span
              className='text-white cursor-pointer hover:underline'
              onClick={toggleSignInForm}>
              {" "}
              {isSignInForm ? "Sign Up now" : "Sign In now"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login

