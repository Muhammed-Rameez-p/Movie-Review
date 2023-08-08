import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { deleteActor, getActor, getActorBySearch } from '../actions/actor';
import { getLikedMovies } from '../actions/movie';
import { getUsers } from '../actions/user';


export default function AllUsers() {

    const user = JSON.parse(localStorage.getItem('profile'));
    const profileId = user?.result?._id

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(()=>{
      dispatch(getUsers())
    },[dispatch])

    const {userAll} = useSelector((state)=> state.user)

    const user_all = userAll?.filter((id) => id._id !== profileId);


  return (
    <>
    <h1 className='ml-14 m-6  text-xl text-gray-600  font-semibold  ' >Liked Movies</h1>

 <ul role="list" className=" divide-y ml-24 mr-10 divide-gray-100 ">
{user_all?.map((person) => (
    <button onClick={()=> navigate(`/single-user/${person._id}`)} >
  <li key={person?.name} className=" ml-10 flex justify-between gap-x-6 py-5 ">
    <div className="flex gap-x-4">
      <img className="h-12 w-12 flex-none shadow-lg shadow-gray-600 rounded-full bg-gray-50 " src={person?.selectedFile} alt="" />
      <div className=" ml-5 min-w-0 flex-auto">
        <p className="text-sm font-semibold leading-6 text-gray-900">{person?.name}</p>
        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person?.email}</p>
      </div>
    </div>

  </li>
  </button>
))}
</ul>
</>
  )
}
