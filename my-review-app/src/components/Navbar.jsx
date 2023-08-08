import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../actions/auth';

export default function Navbar() {

  const user = JSON.parse(localStorage.getItem('profile'));
  let name = user?.result?.name
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const LogoutClick = () => {
    dispatch(logout(navigate))
  }

    
  return (
    <>
    <div class="  p-2 max-w-full mx-auto bg-gray-600  flex items-center space-x-4 shadow-lg shadow-gray-600">
 
  <div>
    <div class="hover:text-red-400 text-xl font-medium text-black"><button onClick={() => navigate('/') }> Cinema List</button></div>
    <p class="text-white">Are you a Movie Lover !</p>
  </div>
  {name ?
  ( <><Link className='pl-16' to="/user-profile"><h1 className='text-pink-600 font-semibold xl hover:text-white'>USER PROFILE </h1></Link>  <Link className='pl-8' to="/all-users"><h1 className='text-pink-600 font-semibold xl hover:text-white'>ALL USER LIST </h1></Link> <h1 className=' text-lg text-purple-600 pl-[20rem]'>" {name} " <button onClick={()=>LogoutClick()} class="px-4 py-1 text-sm text-purple-600 
font-semibold rounded-full border border-purple-200 hover:text-white
 hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2
  focus:ring-purple-600 focus:ring-offset-2 absolute right-10">
    Log Out
    </button> </h1> </>)
   :
 ( <button onClick={() => navigate('/signup') } class="px-4 py-1 text-sm text-purple-600 
font-semibold rounded-full border border-purple-200 hover:text-white
 hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2
  focus:ring-purple-600 focus:ring-offset-2 absolute right-10">
    Log In
    </button>)}
</div>

</>
  )
}
