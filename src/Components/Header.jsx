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
import { toggleGPTSearchView } from '../Utils/GPTSlice';
import { SUPPORTED_LANGUAGES } from '../Utils/constant';
import { changeLanguage } from '../Utils/configSlice';

  const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // navigate("/")
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView());
  };

  // used in the header as the onAuthStateChange as it is central to the app and tracks the user state
  // ...whenever signedIn/signedOut onAuthStateChange is called and routing can be done from here
  // so whenever the header component is rendered the useEffect is called and the user is tracked
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    // cleanup function .i.e. when the component is unmounted the unsubscribe function is called
    // (unsubscribe from the auth state change)
    return () => unsubscribe();
  }, []); // empty dependency array ensures that the effect runs only once when the component is mounted


  return (
    // <div
    //   className='z-50 md:h-24 w-full absolute flex flex-col justify-center md:flex-row md:justify-between bg-gradient-to-b from-black to-transparent overflow-hidden
    //  bg-black'
    // >
      <div
      className={`z-50 md:h-20 w-full flex flex-col absolute justify-center overflow-hidden md:flex-row md:justify-between
        ${user ? "bg-black" : "bg-gradient-to-b from-black to-transparent"}`}
    >
      <div className='m-2 pt-2 md:pt-0 flex md:items-center'>
        <img className='w-24 md:p-2 md:w-2/12 md:mx-0'
          src={LOGO_URL}
          alt='logo'
        />
        {user && (
          <>
            <button
              className='md:m-2 p-2 font-light text-white text-sm whitespace-nowrap'
              onClick={handleGPTSearchClick}
            >
              {showGPTSearch ? "Home" : "GPT"}
            </button>
            <button
              className='m-2  py-1 text-sm font-light text-slate-50 whitespace-nowrap'
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </>
        )}
      </div>
      {user && (
        <div className='m-1 px-5 flex items-center'>
          {showGPTSearch && (
            <select
              className='p-1 text-xs md:text-sm rounded-sm outline-none'
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <img
            className='m-2 md:m-2 md:p-5 w-10 h-10 md:w-32 md:h-20 rounded-md object-cover'
            src={user?.photoURL}
            alt='userIcon'
          />
        </div>
      )}
    </div>
  );
}
export default Header;
