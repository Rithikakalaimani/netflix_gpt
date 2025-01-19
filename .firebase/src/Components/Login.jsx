import { useState,useRef } from 'react';
import React from 'react'
import Header from './Header'
import validate from "../Utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../Utils/firebase";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addUser} from "../Utils/userSlice";
import { PHOTO_URL } from '../Utils/constant';

const Login = () => {

  const[isSignInForm,setSignInForm] = useState(true); // sign up logic
  const [errorMessage, setErrorMessage] = useState(null); // error message 

  const toggleSignInForm = () =>{ 
   setSignInForm(!isSignInForm);
  }
  const navigate  = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);//email validation 
  const email = useRef(null);
  const password = useRef(null);
  const handleFormValidation = ()=>{
  
    const nameValue = name.current ? name.current.value : "";
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const message = validate(emailValue, passwordValue, nameValue,isSignInForm);
    setErrorMessage(message);
    if(message) return;

    if(!isSignInForm)
    {
      //sign up logic
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser; // from updated user of the auth 
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });

    }
    else
    {
      //sign in logic 
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+"-"+errorMessage);
        });
    }

 }
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className='w-screen object-cover  '
          src='https://assets.nflxext.com/ffe/siteui/vlv3/2f5a878d-bbce-451b-836a-398227a34fbf/web/IN-en-20241230-TRIFECTA-perspective_5ab944a5-1a71-4f6d-b341-8699d0491edd_large.jpg'
          alt='bg'
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className='p-10 w-4/12 h-[27rem] relative top-40 mr-auto ml-auto bg-black bg-opacity-80 flex flex-col rounded-md'
      >
        <h1 className='px-8 pb-2 text-white font-semibold text-3xl'>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className='flex flex-col items-center'>
          {!isSignInForm && (
            <input
              id='name'
              ref={name}
              type='text'
              placeholder='Name'
              autoComplete='name'
              className={`m-2 p-2 w-10/12 bg-transparent border-[1px] border-gray-400 rounded-md font-light text-slate-50 outline-inherit
              ${errorMessage === "Name is not Valid" ? "border-red-600" : ""}`}
            />
          )}
          <input
            id='email'
            ref={email}
            type='text'
            placeholder='Email or Mobile Number'
            autoComplete='email'
            className={`m-2 p-2 w-10/12 bg-transparent border-[1px] border-gray-400 rounded-md font-light text-slate-50 outline-inherit
              ${errorMessage === "Email is not Valid" ? "border-red-600" : ""}`}
          />
          <input
            id='password'
            ref={password}
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            className={`m-2 p-2 w-10/12 bg-transparent border-[1px] border-gray-400 rounded-md font-light text-slate-50 outline-inherit
              ${
                errorMessage === "Password is not Valid" ? "border-red-600" : ""
              }`}
          />
          <p className='text-red-700 font-medium'>{errorMessage}</p>
          <button
            className='mt-5 m-2 p-2 w-10/12 bg-red-600 hover:bg-red-700 text-white rounded-md'
            onClick={handleFormValidation}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
        </div>
        <div className='flex flex-col'>
          <p className='px-8 pt-2 text-zinc-400 font-light text-sm'>
            {isSignInForm ? "New to Netflix?" : "Already a member?"}{" "}
            <span
              className='text-white cursor-pointer hover:underline'
              onClick={toggleSignInForm}
            >
              {" "}
              {isSignInForm ? "Sign Up now" : "Sign In now"}
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}
export default Login;

