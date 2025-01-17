import React from 'react'
import {auth} from "../Utils/firebase";
import {signOut} from "firebase/auth";
import {useNavigate} from "react-router-dom"; 
import {useSelector} from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { LOGO_URL } from '../Utils/constant';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store)=>store.user);

  const handleSignOut = ()=>{
    signOut(auth)
      .then(() => {
        // navigate("/")
      })
      .catch((error) => {
        navigate("/error");
      });
  }

// used in the header as the onAuthStateChange as it is central to the app and tracks the user state 
// ...whenever signedIn/signedOut onAuthStateChange is called and routing can be done from here 
// so whenever the header component is rendered the useEffect is called and the user is tracked 
 useEffect(()=>{   
    const  unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const{uid,email,displayName,photoURL}= user;
        dispatch(addUser({
          uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL}));
          navigate("/browse");
      } 
      else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // cleanup function .i.e. when the component is unmounted the unsubscribe function is called 
    // (unsubscribe from the auth state change)
    return () => unsubscribe();
  
  },[]); // empty dependency array ensures that the effect runs only once when the component is mounted 


  return (
    <div className='z-50 h-20 w-full flex flex-row justify-between absolute bg-gradient-to-b from-black to-transparent overflow-hidden'>
        <div className="m-2 flex items-center">
        <img
          className='w-2/12'
          src={LOGO_URL}
          alt='logo'
        />
        </div>
       {user && 
        (<div className="m-5 px-10 flex items-center">
          <img
            className="m-2 w-10 h-10 rounded-md"
            // src='https://occ-0-2041-3662.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABStlS0MPUGcy6Ovyeia-3ddnnXNb2Lri4P4H4QCFuR_yaGs0umyqHUDOZcOBKF8MFUGHX07txAW70z7wq_S9AKGQ_MixrLQ.png?r=a4b'
            src={user?.photoURL}
            alt='userIcon'
          />
          <button className="m-2 px-5 py-1 text-sm font-light text-slate-50 whitespace-nowrap"
          onClick={handleSignOut}>Sign Out</button>
        </div>)}
    </div>
  );
}
export default Header;
