import { useState,useRef } from 'react';
import React from 'react'
import Header from './Header'
import validate from "../Utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../Utils/firebase";
import { BG_IMG_URL, PHOTO_URL } from '../Utils/constant';

const Login = () => {

  const[isSignInForm,setSignInForm] = useState(true); // sign up logic
  const [errorMessage, setErrorMessage] = useState(null); // error message 

  const toggleSignInForm = () =>{ 
   setSignInForm(!isSignInForm);
  }

  const name = useRef(null);//email validation 
  const email = useRef(null);
  const password = useRef(null);
  const handleFormValidation = async (e) => {
    e?.preventDefault();
    
    const nameValue = name.current ? name.current.value : "";
    const emailValue = email.current?.value || "";
    const passwordValue = password.current?.value || "";
    
    // Clear previous errors
    setErrorMessage(null);
    
    // Validate inputs
    const message = validate(emailValue, passwordValue, nameValue, isSignInForm);
    if (message) {
      setErrorMessage(message);
      return;
    }

    try {
      if (!isSignInForm) {
        // Sign up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailValue,
          passwordValue
        );
        
        // Update profile with photo URL
        await updateProfile(userCredential.user, {
          displayName: nameValue,
          photoURL: PHOTO_URL,
        }).catch((error) => {
          console.error("Error updating profile:", error);
          // Continue even if profile update fails
        });
        
        // Verify the profile was updated
        if (auth.currentUser) {
          // Reload user to get updated profile
          await auth.currentUser.reload();
        }

        // User will be added to Redux via Header's onAuthStateChanged
        // Navigation will happen automatically via Header's useEffect
      } else {
        // Sign in logic
        await signInWithEmailAndPassword(auth, emailValue, passwordValue);
        // User will be added to Redux via Header's onAuthStateChanged
        // Navigation will happen automatically via Header's useEffect
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Show user-friendly error messages
      let errorMsg = "An error occurred. Please try again.";
      
      switch (error.code) {
        case "auth/user-not-found":
          errorMsg = "No account found with this email address.";
          break;
        case "auth/wrong-password":
          errorMsg = "Incorrect password. Please try again.";
          break;
        case "auth/email-already-in-use":
          errorMsg = "This email is already registered. Please sign in instead.";
          break;
        case "auth/weak-password":
          errorMsg = "Password should be at least 6 characters long.";
          break;
        case "auth/invalid-email":
          errorMsg = "Please enter a valid email address.";
          break;
        case "auth/invalid-credential":
          errorMsg = "Invalid email or password. Please check your credentials.";
          break;
        case "auth/too-many-requests":
          errorMsg = "Too many failed attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          errorMsg = "Network error. Please check your internet connection.";
          break;
        case "auth/user-disabled":
          errorMsg = "This account has been disabled. Please contact support.";
          break;
        case "auth/operation-not-allowed":
          errorMsg = "This operation is not allowed. Please contact support.";
          break;
        case "auth/requires-recent-login":
          errorMsg = "Please sign out and sign in again to continue.";
          break;
        default:
          // For any unhandled errors, show a generic but friendly message
          if (error.message) {
            errorMsg = error.message;
          }
      }
      setErrorMessage(errorMsg);
    }
  };
  return (
    <div>
      <Header />
      <div className='absolute'>
        <img
          className='w-screen h-screen object-cover  '
          src={BG_IMG_URL}
          alt='bg'
        />
      </div>
      <div className="flex justify-content items-center">
      <form
        onSubmit={handleFormValidation}
        className=' p-5 lg:p-10 w-10/12 md:w-8/12 lg:w-4/12 h-[27rem] relative top-52 md:top-80 lg:top-40 mr-auto ml-auto bg-black bg-opacity-80 flex flex-col rounded-md'
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
              className={`m-2 p-2 w-10/12 bg-transparent border-[1px] rounded-md font-light text-slate-50 outline-none transition-colors duration-200
              ${errorMessage && (errorMessage.includes("name") || errorMessage.includes("Name")) 
                ? "border-red-600 focus:border-red-500" 
                : "border-gray-400 focus:border-white"}`}
            />
          )}
          <input
            id='email'
            ref={email}
            type='email'
            placeholder='Email or Mobile Number'
            autoComplete='email'
            required
            className={`m-2 p-2 w-10/12 bg-transparent border-[1px] rounded-md font-light text-slate-50 outline-none transition-colors duration-200
              ${errorMessage && (errorMessage.includes("Email") || errorMessage.includes("email")) 
                ? "border-red-600 focus:border-red-500" 
                : "border-gray-400 focus:border-white"}`}
          />
          <input
            id='password'
            ref={password}
            type='password'
            placeholder='Password'
            autoComplete='current-password'
            required
            className={`m-2 p-2 w-10/12 bg-transparent border-[1px] rounded-md font-light text-slate-50 outline-none transition-colors duration-200
              ${errorMessage && (errorMessage.includes("Password") || errorMessage.includes("password")) 
                ? "border-red-600 focus:border-red-500" 
                : "border-gray-400 focus:border-white"}`}
          />
          {errorMessage && (
            <div className='w-10/12 mt-3 mb-2 p-3 bg-red-900/30 border border-red-600 rounded-md animate-fade-in'>
              <div className='flex items-start gap-2'>
                <svg 
                  className='w-5 h-5 text-red-500 flex-shrink-0 mt-0.5' 
                  fill='currentColor' 
                  viewBox='0 0 20 20'
                >
                  <path 
                    fillRule='evenodd' 
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z' 
                    clipRule='evenodd' 
                  />
                </svg>
                <p className='text-red-300 font-medium text-sm leading-relaxed'>{errorMessage}</p>
              </div>
            </div>
          )}
          <button
            type="submit"
            className='mt-5 m-2 p-2 w-10/12 bg-red-600 hover:bg-red-700 text-white rounded-md'
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
    </div>
  );
}
export default Login;

